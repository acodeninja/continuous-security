import packageJson from '../package.json';
import Dockerfile from './assets/Dockerfile';
import Scan from './assets/scan.sh';
import {readFile} from 'fs/promises';
import {resolve} from 'path';

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'python-pip-audit',
  buildConfiguration: {files: {Dockerfile, 'scan.sh': Scan}},
  report: async (location): Promise<ScanReport> =>
    readFile(resolve(location, 'report.json'))
      .then(r => r.toString('utf8'))
      .then(r => JSON.parse(r))
      .then((r: PipAuditReport) =>
        ({
          scanner: packageJson.name,
          issues: r.dependencies.map(({name, version, vulns}) =>
            vulns.map((vulnerability): ScanReport['issues'][0] => ({
              title: `Vulnerable Third-Party Library \`${name}\``,
              description: '',
              severity: 'unknown',
              type: 'dependency',
              fix: 'unknown',
              package: {name, version},
              references: [vulnerability.id],
            })),
          ).flat(),
        })),
} as Scanner;
