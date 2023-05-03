import {template, TemplateExecutor} from 'lodash';
import BaseTemplate from './assets/report.template.md';

export class Report {
  private readonly template: TemplateExecutor;
  private reports: Array<ScanReport> = [];

  constructor() {
    this.template = template(BaseTemplate);
  }

  addScanReport(report: ScanReport): void {
    this.reports.push(report);
  }

  async toObject(): Promise<ReportOutput> {
    const issues = this.reports.map(r => r.issues.map(issue => ({
      ...issue,
      foundBy: r.scanner,
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
