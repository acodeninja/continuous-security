import {readFile} from 'fs/promises';
import {resolve} from 'path';

import packageJson from '../package.json';
import Dockerfile from './assets/Dockerfile';
import Scan from './assets/scan.sh';
import ZapYAML from './assets/zap.yml';

const mapZapSeverityToScanSeverity = (zapSeverity: string): ScanReportIssue['severity'] => {
  const map = {
    none: 'info',
    note: 'low',
    warning: 'moderate',
    error: 'high',
  };

  return map[zapSeverity];
};

const groupBy = (list: Array<unknown>, grouping: string) => {
  const groupedIssues = [{}, ...list].reduce((group: Record<string, ZapSarifReportGroupedResult> = {}, item: ZapSarifReportResult) => {
    if (item) {
      const request = {
        request: {
          target: item.webRequest.target,
          method: item.webRequest.method,
          headers: item.webRequest.headers,
        },
        response: {
          statusCode: item.webResponse.statusCode,
          headers: item.webResponse.headers,
        },
      };

      group[item[grouping]] = {
        ruleId: item.ruleId,
        locations: item.locations,
        level: item.level,
        message: item.message.text,
        requests: Array.isArray(group[item[grouping]]?.requests) ?
          group[item[grouping]].requests.concat(request) : [request],
      };
    }
    return group;
  });

  return Object.values(groupedIssues);
};

export default {
  name: packageJson.name,
  version: packageJson.version,
  slug: 'zed-attack-proxy',
  buildConfiguration: {files: {Dockerfile, 'scan.sh': Scan, 'zap.yml': ZapYAML}},
  runConfiguration: {
    target: {required: true},
  },
  report: async (location): Promise<ScanReport> =>
    readFile(resolve(location, 'report.json'))
      .then((content: Buffer) => content.toString('utf-8'))
      .then((content: string) => JSON.parse(content))
      .then((report: ZapSarifReport) => {
        const groupedIssues = groupBy(report.runs.map(r => r.results).flat(), 'ruleId');
        const rules = Object.fromEntries(report.runs.map(r => r.tool.driver.rules).flat().map(r => ([r.id, r])));

        return {
          scanner: packageJson.name,
          issues: groupedIssues.map(i => ({
            title: rules[i.ruleId].name,
            description: rules[i.ruleId].fullDescription.text,
            type: 'web request',
            references: rules[i.ruleId].relationships
              .filter(r => r.target.toolComponent.name === 'CWE')
              .map(r => `${r.target.toolComponent.name}-${r.target.id}`),
            fix: 'Unknown',
            severity: mapZapSeverityToScanSeverity(i.level),
            requests: i.requests,
          } as ScanReportIssue)),
        };
      }),
} as Scanner;
