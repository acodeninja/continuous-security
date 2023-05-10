import {template, TemplateExecutor} from 'lodash';
import BaseTemplate from './assets/report.template.md';
import {CWE} from "./DataSources/CWE";

export class Report {
  private readonly template: TemplateExecutor;
  private reports: Array<ScanReport> = [];
  private cweDataset: CWE = new CWE();

  constructor() {
    this.template = template(BaseTemplate);
  }

  addScanReport(report: ScanReport): void {
    this.reports.push(report);
  }

  private expandReference(reference: string, issue: ScanReportIssue): ReportOutputIssueReference {
    const slug = reference.toLowerCase();
    const [label, id] = slug.split('-');

    if (slug.indexOf('cwe') === 0) {
      return this.cweDataset.getById(reference.toUpperCase())
    }
  }

  async toObject(): Promise<ReportOutput> {
    const issues = this.reports.map(r => r.issues.map(issue => ({
      ...issue,
      foundBy: r.scanner,
      references: issue.references.map(ref => this.expandReference(ref, issue)),
    }))).flat();

    return {
      title: 'Security Reporting',
      date: new Date(),
      issues,
      counts: this.reports.map(report => report.counts)
        .reduce((previousValue: ScanReport['counts'], currentValue) => ({
          critical: (previousValue.critical ?? 0) + currentValue.critical,
          high: (previousValue.high ?? 0) + currentValue.high,
          moderate: (previousValue.moderate ?? 0) + currentValue.moderate,
          low: (previousValue.low ?? 0) + currentValue.low,
          info: (previousValue.info ?? 0) + currentValue.info,
          unknown: (previousValue.unknown ?? 0) + currentValue.unknown,
          total: (previousValue.total ?? 0) + currentValue.total,
        })),
    };
  }

  async toJSON(): Promise<[string, Buffer]> {
    return ['json', Buffer.from(JSON.stringify(await this.toObject(), null, 2))];
  }

  async toMarkdown(): Promise<[string, Buffer]> {
    return ['md', Buffer.from(this.template(await this.toObject()))];
  }

  async getReport(type: 'markdown' | 'json'): Promise<[string, Buffer]> {
    switch (type) {
    case 'markdown':
      return await this.toMarkdown();
    case 'json':
      return await this.toJSON();
    }
  }
}
