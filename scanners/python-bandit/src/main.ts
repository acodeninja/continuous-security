import packageJson from '../package.json';
import Dockerfile from './assets/Dockerfile';
import Scan from './assets/scan.sh';
import {readFile} from 'fs/promises';
import {resolve} from 'path';

const translateSeverity =
  (severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNDEFINED'): 'low' | 'moderate' | 'high' | 'unknown' => {
    switch (severity) {
    case 'LOW':
      return 'low';
    case 'MEDIUM':
      return 'moderate';
    case 'HIGH':
      return 'high';
    case 'UNDEFINED':
      return 'unknown';
    }
  };

const parseCode = (code: string): string => code
  .split(/(\\\\n|\\n|\n)/)
  .map(line => line.split('').slice(2).join(''))
  .filter(l => !!l)
  .join('\n');

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'python-bandit',
  buildConfiguration: {files: {Dockerfile, 'scan.sh': Scan}},
  report: async (location): Promise<ScanReport> =>
    readFile(resolve(location, 'report.json'))
      .then(r => r.toString('utf8'))
      .then(r => JSON.parse(r))
      .then((r: BanditReport) => ({
        scanner: packageJson.name,
        issues: r.results.map(result => ({
          title: result.issue_text,
          description: '',
          type: 'code smell',
          references: result.issue_cwe ? [`CWE-${result.issue_cwe.id.toString()}`] : [],
          fix: 'unknown',
          severity: translateSeverity(result.issue_severity),
          extracts: [{
            code: parseCode(result.code),
            lines: result.line_range.map(l => l.toString()),
            path: result.filename.replace('/target/', ''),
            language: 'python',
          }],
        })),
      })),
} as Scanner;
