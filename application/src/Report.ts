import {template, TemplateExecutor} from 'lodash';
import {basename} from 'path';
import {readFile} from 'fs/promises';
import BaseTemplate from './assets/report.template.md';
import {CVE} from './DataSources/CVE';
import {CWE} from './DataSources/CWE';
import {OSV} from './DataSources/OSV';
import {Emitter} from './Emitter';
import {translate} from "./DataSources/Translations";

export class Report {
  private readonly template: TemplateExecutor;
  private reports: Array<ScanReport> = [];
  private cveDataset: CVE = new CVE();
  private cweDataset: CWE = new CWE();
  private osvDataset: OSV = new OSV();
  private emitter: Emitter;
  private severityOrder = ['critical', 'high', 'moderate', 'low', 'info', 'unknown'];
  private reportFunctions: Record<string, (...args: Array<unknown>) => unknown> = {
    groupBy: (list: Array<unknown>, grouping: string) => {
      const groupedIssues =
        [{}, ...list].reduce((group: Record<string, Array<unknown>> = {}, item) => {
          if (item) {
            group[item[grouping]] = group[item[grouping]] ?? [];
            group[item[grouping]].push(item);
          }
          return group;
        });

      const asEntries = Object.entries(groupedIssues);

      asEntries.sort((a, b) => this.severityOrder.indexOf(a[0]) - this.severityOrder.indexOf(b[0]));

      return Object.fromEntries(asEntries);
    },
    capitalise: (words: string) =>
      words.split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
  };

  constructor(emitter: Emitter) {
    this.template = template(BaseTemplate);
    this.emitter = emitter;
  }

  addScanReport(report: ScanReport): void {
    this.reports.push(report);
  }

  private async expandReferences(references: Array<string>):
    Promise<Array<ReportOutputIssueReference>> {
    const expandedReferences: Record<string, ReportOutputIssueReference> = {};
    const referencesToProcess = Array.from(references);

    while (referencesToProcess
      .filter(r => !Object.keys(expandedReferences).includes(r)).length > 0) {
      for (const ref of referencesToProcess
        .filter(r => !Object.keys(expandedReferences).includes(r))) {
        const slug = ref.toLowerCase();
        this.emitter.emit('report:reference', `fetching details for ${ref}`);

        try {
          if (slug.indexOf('cwe') === 0) {
            expandedReferences[ref] = this.cweDataset.getById(ref.toUpperCase());
          } else if (slug.indexOf('cve') === 0) {
            expandedReferences[ref] = await this.cveDataset.getById(ref.toUpperCase());
          } else {
            expandedReferences[ref] = await this.osvDataset.getById(ref);
          }
        } catch (e) {
          this.emitter.emit(
            'report:reference:failure',
            `Failed to fetch vulnerability reference ${ref}`,
          );
          referencesToProcess.splice(referencesToProcess.indexOf(ref), 1);
        }

        if (expandedReferences[ref]?.dataSourceSpecific?.osv?.aliases) {
          expandedReferences[ref].dataSourceSpecific.osv.aliases
            .forEach(a => referencesToProcess.push(a));
        }
      }
    }

    const outputReferences = Object.values(expandedReferences);

    outputReferences.sort((a, b) =>
      (a.label < b.label) ? -1 : ((a.label > b.label) ? 1 : 0));

    return outputReferences;
  }

  async toObject(): Promise<ReportOutput> {
    const issues = await this.getIssues();

    const overviewOfIssues = issues.map(i => i.references).flat()
      .filter(r => !!r.dataSourceSpecific.cwe)
      .filter((r, i, all) => all.map(a => a.label).indexOf(r.label) === i);

    const summaryImpacts: Record<string, Array<string>> = {};

    overviewOfIssues
      .map(({dataSourceSpecific}) =>
        dataSourceSpecific?.cwe?.consequences?.map(({scopeImpacts}) =>
          scopeImpacts,
        ),
      )
      .flat(2)
      .forEach(si => {
        summaryImpacts[si.scope] = summaryImpacts[si.scope] ?? [];
        if (si.impact && !summaryImpacts[si.scope].includes(si.impact)) {
          summaryImpacts[si.scope].push(si.impact);
        }
      });

    overviewOfIssues.sort((a, b) =>
      parseInt(a.label.replace('CWE-', '')) - parseInt(b.label.replace('CWE-', '')));

    const severities = issues.map(i => i.severity);

    return JSON.parse(translate(JSON.stringify({
      title: `Security Report for ${basename(process.cwd())}`,
      date: new Date(),
      summaryImpacts: Object.entries(summaryImpacts).map(([scope, impacts]) => ({scope, impacts})),
      overviewOfIssues,
      issues,
      counts: {
        critical: severities.filter(s => s === 'critical').length,
        high: severities.filter(s => s === 'high').length,
        moderate: severities.filter(s => s === 'moderate').length,
        low: severities.filter(s => s === 'low').length,
        info: severities.filter(s => s === 'info').length,
        unknown: severities.filter(s => s === 'unknown').length,
        total: severities.length,
      },
    })), (key, value) => {
      if (
        String(value).length === 24 &&
        String(value).match(/\d{4}-\d{2}-\d{2}T(\d{2}:){2}\d{2}.\d{3}Z/)
      ) return new Date(value);

      return value;
    });
  }

  async toJSON(): Promise<[string, Buffer]> {
    const report = await this.toObject();
    this.emitter.emit('report:finished', '');

    return ['json', Buffer.from(JSON.stringify(report, null, 2))];
  }

  async toMarkdown(): Promise<[string, Buffer]> {
    const report = await this.toObject();
    this.emitter.emit('report:finished', '');

    return ['md', Buffer.from(this.template({...report, functions: this.reportFunctions}))];
  }

  async getReport(type: 'markdown' | 'json'): Promise<[string, Buffer]> {
    this.emitter.emit('report:started', `generating output report in ${type}`);
    switch (type) {
    case 'markdown':
      return await this.toMarkdown();
    case 'json':
      return await this.toJSON();
    }
  }

  private async getIssues(): Promise<Array<ReportOutputIssue>> {
    const withFoundBy = this.reports.map(r => r.issues.map(issue => ({
      ...issue,
      foundBy: r.scanner,
    }))).flat();

    const withExpandedReferences = await Promise.all(withFoundBy.map(async (issue) => ({
      ...issue,
      references: issue.references ? await this.expandReferences(issue.references) : [],
    })));

    const withHighestSeverities = withExpandedReferences.map(i => {
      const severities = i.references.map(r => r.dataSourceSpecific?.osv?.severity)
        .concat(i.severity)
        .filter(s => !!s);

      severities.sort((a, b) => this.severityOrder.indexOf(a) - this.severityOrder.indexOf(b));

      return {...i, severity: severities[0]};
    });

    return await Promise.all(withHighestSeverities.map(async issue => {
      return {
        ...issue,
        extracts: issue.extracts ? await Promise.all(issue.extracts.map(async extract => {
          const code = (await readFile(extract.path)).toString().split('\n');
          const start = Math.max(parseInt(extract.lines[0]) - 3, 0);
          const end = Math.min(parseInt(extract.lines[0]) + 2, code.length);
          const lines = new Array(code.slice(start, end).length)
            .fill(null)
            .map((_, i) => start + i + 1);

          return {
            ...extract,
            lines: extract.lines.map(line => `${line}`),
            code: code.slice(start, end).map((l, i) => {
              const length = lines[lines.length - 1].toString().length;
              return `${lines[i].toString().padStart(length)}| ${l}`;
            }).join('\n'),
          };
        })) : undefined,
      };
    }));
  }
}
