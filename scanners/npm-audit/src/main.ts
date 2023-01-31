import {readFile} from "fs/promises";

import packageJson from "../package.json";
import Dockerfile from "./assets/Dockerfile";
import Scan from "./assets/scan.sh";

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'npm-audit',
  buildConfiguration: {files: {Dockerfile, 'scan.sh': Scan}},
  validate: async (_configuration) => {
  },
  report: async (location): Promise<ScanReport> =>
    readFile(location)
      .then((content: Buffer) => content.toString('utf-8'))
      .then((content: string) => JSON.parse(content))
      .then((report: NpmAudit) => {
        return {
          issues: Object.entries(report.vulnerabilities).map(([_name, content]) => {
            const title = content.via.map(v => v.title)
              .filter((t, i) => content.via.map(v => v.title).indexOf(t) === i)
              .join(' & ');

            return {
              title,
              description: '',
              type: 'dependency',
              severity: content.severity,
            };
          }),
          counts: report.metadata.vulnerabilities,
        };
      }),
} as Scanner;
