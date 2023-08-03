import {exec} from 'child_process';
import {writeFile, cp, rm} from 'fs/promises';
import {resolve} from 'path';
import {promisify} from 'util';

import {Configuration} from './Configuration';
import {Emitter} from './Emitter';
import {loadScannerModule, makeTemporaryFolder} from './Helpers';
import {Report} from './Report';
import {Scan} from './Scan';

import packageJson from '../package.json';

export class Orchestrator {
  public readonly emitter: Emitter;
  private projectRoot: string;
  public configuration?: Configuration;
  private scans: Array<Scan> = [];
  private report: Report;

  constructor(projectRoot: string) {
    this.emitter = new Emitter();
    this.projectRoot = projectRoot;
    this.report = new Report(this.emitter);
  }

  async run(): Promise<void> {
    this.emitter.emit('scan:started', '');
    this.configuration = await Configuration.load(this.projectRoot);

    if (this.configuration.ignore?.length > 0) {
        const tempProjectRoot = await makeTemporaryFolder('project-');
        await cp(this.projectRoot, tempProjectRoot, {recursive: true});
        await Promise.all(this.configuration.ignore.map(async (ignore) => {
            await rm(resolve(tempProjectRoot, ignore), {recursive: true}).catch();
        }));
        this.projectRoot = tempProjectRoot;
    }

    if (!process.env.DEBUG) {
      const installs = this.configuration.scanners
        .map(scanner => `${scanner.name}`)
        .map(s => s.indexOf('@continuous-security') === 0 ? `${s}@${packageJson.version}` : s)
        .join(' ');

      await promisify(exec)(
        `npm install -g ${installs}`,
        {cwd: process.cwd()},
      );
    }

    this.configuration.scanners.forEach(configuration => {
      this.emitter.emit('scanner:installed', configuration.name);
    });

    await Promise.all(
      this.configuration.scanners.map(configuration => new Promise<void>(resolve => {
        loadScannerModule(configuration.name)
          .then(scanner => {
            this.scans.push(new Scan(this.emitter, scanner, configuration, this.projectRoot));
            this.emitter.emit('scanner:loaded', scanner.name);
            resolve();
          });
      })),
    );

    await Promise.all(
      this.scans.map(scan => scan.setup()
        .then(s => s.run())
        .then(s => s.teardown())
        .then(s => {
          this.report.addScanReport(s.report);
          this.emitter.emit('scanner:report:collected', s.scanner.name);
        }),
      ),
    ).then(() => {
      this.emitter.emit('scan:finished', '');
    });
  }

  async writeReport(path: string, type: 'markdown' | 'json'): Promise<void> {
    const [extension, report] = await this.report.getReport(type);
    await writeFile(resolve(path, `report.${extension}`), report);
  }

  async getIssueCount(): Promise<number> {
    const report = await this.report.toObject();

    return report.issues.length;
  }
}
