import {template, TemplateExecutor} from 'lodash';
import {basename} from 'path';
import BaseTemplate from './assets/report.template.md';
import {CVE} from './DataSources/CVE';
import {CWE} from './DataSources/CWE';
import {OSV} from './DataSources/OSV';
import {Emitter} from './Emitter';

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
      const groupedIssues = [{}, ...list].reduce((group: Record<string, Array<unknown>> = {}, item) => {
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
    capitalise: (words: string) => words.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  };

  constructor(emitter: Emitter) {
    this.template = template(BaseTemplate);
    this.emitter = emitter;
  }

  addScanReport(report: ScanReport): void {
    this.reports.push(report);
  }

  private async expandReferences(references: Array<string>): Promise<Array<ReportOutputIssueReference>> {
    const expandedReferences: Record<string, ReportOutputIssueReference> = {};
    const referencesToProcess = Array.from(references);

    while (referencesToProcess.filter(r => !Object.keys(expandedReferences).includes(r)).length > 0) {
      for (const ref of referencesToProcess.filter(r => !Object.keys(expandedReferences).includes(r))) {
        const slug = ref.toLowerCase();
        this.emitter.emit('report:reference', `fetching details for ${ref}`);

        if (slug.indexOf('cwe') === 0) {
          expandedReferences[ref] = this.cweDataset.getById(ref.toUpperCase());
        } else if (slug.indexOf('cve') === 0) {
          expandedReferences[ref] = await this.cveDataset.getById(ref.toUpperCase());
        } else {
          try {
            expandedReferences[ref] = await this.osvDataset.getById(ref);
          } catch (e) {
            this.emitter.emit('report:reference:failure', `Failed to fetch vulnerability reference ${ref}`);
            referencesToProcess.splice(referencesToProcess.indexOf(ref), 1);
          }
        }

        if (expandedReferences[ref]?.dataSourceSpecific?.osv?.aliases) {
          expandedReferences[ref].dataSourceSpecific.osv.aliases.forEach(a => referencesToProcess.push(a));
        }
      }
    }

    return Object.values(expandedReferences);
  }

  async toObject(): Promise<ReportOutput> {
    const issuesWithScanner = this.reports.map(r => r.issues.map(issue => ({
      ...issue,
      foundBy: r.scanner,
    }))).flat();

    const expandedIssues = await Promise.all(issuesWithScanner.map(async (issue) => ({
      ...issue,
      references: issue.references ? await this.expandReferences(issue.references) : [],
    })));

    const issues = expandedIssues.map(i => {
      const severities = i.references.map(r => r.dataSourceSpecific?.osv?.severity)
        .concat(i.severity)
        .filter(s => !!s);

      severities.sort((a, b) => this.severityOrder.indexOf(a) - this.severityOrder.indexOf(b));

      return {...i, severity: severities[0]};
    });

    const overviewOfIssues = expandedIssues.map(i => i.references).flat()
      .filter(r => !!r.dataSourceSpecific.cwe)
      .filter((r, i, all) => all.map(a => a.label).indexOf(r.label) === i);

    overviewOfIssues.sort((a, b) =>
      parseInt(a.label.replace('CWE-', '')) - parseInt(b.label.replace('CWE-', '')));

    const severities = issues.map(i=> i.severity);

    return {
      title: `Security Report for ${basename(process.cwd())}`,
      date: new Date(),
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
    };
  }

  async toJSON(): Promise<[string, Buffer]> {
    const report = await this.toObject();
    this.emitter.emit('report:finished', '');
    return ['json', Buffer.from(JSON.stringify(report, null, 2))];
  }

  async toMarkdown(): Promise<[string, Buffer]> {
    const report = await this.toObject();
    this.emitter.emit('report:finished', '');

    // console.log(JSON.stringify(this.reportFunctions.groupBy(report.issues, 'severity'), null, 2))

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
}
