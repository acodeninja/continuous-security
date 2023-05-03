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
          issues: r.dependencies
            .map(({name, vulns}) => vulns.map(vulnerability => ({
              ...vulnerability,
              title: `Vulnerable Third-Party Library \`${name}\``,
            })))
            .flat()
            .map(({title}) => ({
              title,
              description: '',
              severity: 'unknown',
              type: 'dependency',
              fix: 'unknown',
            })),
          counts: {
            info: 0,
            low: 0,
            moderate: 0,
            high: 0,
            critical: 0,
            unknown: r.dependencies.map(dep => dep.vulns).flat().length,
            total: r.dependencies.map(dep => dep.vulns).flat().length,
          },
        })),
} as Scanner;
