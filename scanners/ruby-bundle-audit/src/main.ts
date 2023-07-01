import packageJson from '../package.json';
import Dockerfile from './assets/Dockerfile';
import Scan from './assets/scan.rb';
import {readFile} from 'fs/promises';
import {resolve} from 'path';

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'ruby-bundle-audit',
  buildConfiguration: {files: {Dockerfile, 'scan.rb': Scan}},
  report: async (location): Promise<ScanReport> =>
    readFile(resolve(location, 'report.json'))
      .then(r => r.toString('utf8'))
      .then(JSON.parse)
      .then((r: BundleAuditReport) =>
        ({
          scanner: packageJson.name,
          issues: r.issues.map(({
            Name: name,
            Version: version,
            Solution: fix,
            Title: description,
            GHSA,
            CVE,
          }): ScanReport['issues'][0] => ({
            title: `Vulnerable Third-Party Library \`${name}\``,
            description,
            severity: 'unknown',
            type: 'dependency',
            fix,
            package: {name, version},
            references: [CVE, GHSA].filter(r => !!r),
          })),
        })),
} as Scanner;
