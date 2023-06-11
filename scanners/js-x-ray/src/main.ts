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
      })),
} as Scanner;
