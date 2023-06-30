import packageJson from '../package.json';
import Dockerfile from './assets/Dockerfile';
import Scan from './assets/scan.sh';
import {readFile} from 'fs/promises';
import {resolve} from 'path';

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'javascript-njsscan',
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
            references: [cwe.split(':')[0]],
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
      })),
} as Scanner;
