import packageJson from '../package.json';
import Dockerfile from './assets/Dockerfile';
import Scan from './assets/scan.sh';
import {readFile} from 'fs/promises';
import {resolve} from 'path';

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'njsscan',
  buildConfiguration: {files: {Dockerfile, 'scan.sh': Scan}},
  report: async (location): Promise<ScanReport> =>
    readFile(resolve(location, 'report.json'))
      .then(r => r.toString('utf8'))
      .then(r => JSON.parse(r))
      .then((r: NodeJSScan) => ({
        scanner: packageJson.name,
        issues: Object.entries(r.nodejs).map(([, {files, metadata: {description, cwe}}]) => {
          return {
            title: cwe.split(': ')[1],
            description,
            type: 'code smell',
            cwe: [cwe.replace('CWE-', '').split(':')[0]],
            severity: 'unknown',
            fix: 'Unknown',
            extracts: files.map(({file_path, match_lines, match_string}) => ({
              path: file_path.replace('/target/', ''),
              code: match_string,
              lines: match_lines.map(line => line.toString()),
              language: 'javascript',
            })),
          };
        }),
        counts: {
          info: 0,
          low: 0,
          moderate: 0,
          high: 0,
          critical: 0,
          unknown: Object.keys(r.nodejs).length,
          total: Object.keys(r.nodejs).length,
        },
      })),
} as Scanner;
