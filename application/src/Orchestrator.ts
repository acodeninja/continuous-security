import {promisify} from 'util';
import {exec} from 'child_process';
import {Emitter} from './Emitter';
import Scan from './Scan';
import {Configuration} from './Configuration';
import {loadScannerModule} from './Helpers';
import {Report} from './Report';
import {resolve} from 'path';
import {writeFile} from 'fs/promises';

export default class Orchestrator {
  public readonly emitter: Emitter;
  private readonly projectRoot: string;
  public configuration?: Configuration;
  private scans: Array<Scan> = [];
  private report: Report;

  constructor(projectRoot: string) {
    this.emitter = new Emitter();
    this.projectRoot = projectRoot;
    this.report = new Report();
  }

  async run(): Promise<void> {
    this.configuration = await Configuration.load(this.projectRoot);

    await promisify(exec)(
      `npm install -g ${this.configuration.scanners.map(scanner => scanner.name).join(' ')}`,
      {
        cwd: process.cwd(),
      }
    );

    this.configuration.scanners.forEach(configuration => {
      this.emitter.emit('scanner:installed', configuration.name);
    });

    await Promise.all(this.configuration.scanners.map(configuration => new Promise<void>(resolve => {
      loadScannerModule(configuration.name)
        .then(scanner => {
          this.scans.push(new Scan(this.emitter, scanner, configuration));
          this.emitter.emit('scanner:loaded', scanner.name);
          resolve();
        });
    })));

    await Promise.all(
      this.scans.map(scan => scan.setup()
        .then(s => s.run())
        .then(s => s.teardown())
        .then(s => {
          this.report.addScanReport(s.report);
          this.emitter.emit('scanner:report:collected', s.scanner.name);
        })
      ),
    );
  }

  async writeReport(path: string, type: 'markdown' | 'json' | 'html' | 'pdf'): Promise<void> {
    const [extension, report] = await this.report.getReport(type);
    await writeFile(resolve(path, `report.${extension}`), report);
  }

  // async report() {
  //   const report = new Report();

  //
  //   const mergedReports = this.reports.map(report => report.issues.map(issue => ({
  //     ...issue,
  //     scanner: report.scanner,
  //   }))).flat(1).sort((a, b) => a.scanner.localeCompare(b.scanner));
  //
  //   console.log(mergedReports, mergedCounts);
  // }
}
