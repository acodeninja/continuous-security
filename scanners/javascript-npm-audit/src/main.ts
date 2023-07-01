import {readFile} from 'fs/promises';
import {resolve} from 'path';

import packageJson from '../package.json';
import Dockerfile from './assets/Dockerfile';
import Scan from './assets/scan.sh';

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'javascript-npm-audit',
  buildConfiguration: {files: {Dockerfile, 'scan.sh': Scan}},
  report: async (location): Promise<ScanReport> =>
    readFile(resolve(location, 'report.json'))
      .then((content: Buffer) => content.toString('utf-8'))
      .then((content: string) => JSON.parse(content))
      .then((report: NpmAudit) => ({
        scanner: packageJson.name,
        issues: Object.entries(report.vulnerabilities)
          .map(([name, {via, fixAvailable}]) =>
            via.map((v): ScanReport['issues'][0] => ({
              title: `Vulnerable Third-Party Library \`${v.dependency}\``,
              description: v.title,
              type: 'dependency',
              package: {name},
              references: v.cwe.concat([v.url.split('/')[4]]),
              severity: v.severity,
              fix: fixAvailable ? `Upgrade to version above ${v.range}` : 'No known fix',
            })),
          ).flat(),
      })),
} as Scanner;
