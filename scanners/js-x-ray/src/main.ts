import packageJson from '../package.json';
import Dockerfile from './assets/Dockerfile';
import Scan from './assets/scan.mjs';
import {readFile} from 'fs/promises';
import {resolve} from 'path';

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'js-x-ray',
  buildConfiguration: {files: {Dockerfile, 'scan.mjs': Scan}},
  report: async (location): Promise<ScanReport> =>
    readFile(resolve(location, 'report.json'))
      .then(r => r.toString('utf8'))
      .then(r => JSON.parse(r))
      .then((r: JSXRayReport) => ({
        scanner: packageJson.name,
        issues: r.issues.map(issue => ({
          ...issue,
          type: 'code smell',
          fix: 'unknown',
        })),
        counts: {
          info: r.issues.filter(i => i.severity === 'info').length,
          low: 0,
          moderate: r.issues.filter(i => i.severity === 'moderate').length,
          high: 0,
          critical: r.issues.filter(i => i.severity === 'critical').length,
          unknown: 0,
          total: r.issues.length,
        },
      })),
} as Scanner;
