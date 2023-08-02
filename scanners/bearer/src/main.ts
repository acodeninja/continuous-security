import packageJson from '../package.json';
import Dockerfile from './assets/Dockerfile';
import Scan from './assets/scan.sh';
import {readFile} from 'fs/promises';
import {resolve} from 'path';

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'bearer',
  buildConfiguration: {files: {Dockerfile, 'scan.rb': Scan}},
  report: async (location): Promise<ScanReport> =>
    readFile(resolve(location, 'report.json'))
      .then(r => r.toString('utf8'))
      .then(JSON.parse)
      .then((r: BearerJsonReport) =>
        ({
          scanner: packageJson.name,
          issues: Object.entries(r).map(([severity, issues]) =>
            issues.map(i => ({
              title: i.title,
              description: i.description,
              type: 'code smell',
              references: i.cwe_ids.map(c => `CWE-${c}`),
              severity,
              fix: 'unknown',
              extracts: [{
                lines: [i.source.start.toString(), i.source.end.toString()],
                path: i.full_filename.replace('/target', ''),
                language: i.id.split('_')[0],
              }],
            } as ScanReportIssue)),
          ).flat(),
        })),
} as Scanner;
