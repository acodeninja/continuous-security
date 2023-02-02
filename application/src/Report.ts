import XmlReader from 'xml-reader';
import XmlQuery from 'xml-query';
import {DOMParser} from '@xmldom/xmldom';
import {select} from 'xpath';
import {template, TemplateExecutor} from 'lodash';

import CWE from './assets/cwe.xml';
import BaseTemplate from './assets/report.template.md';

export class Report {
  private readonly cweData: Document;
  private readonly template: TemplateExecutor;
  private reports: Array<ScanReport> = [];

  constructor() {
    this.cweData = (new DOMParser()).parseFromString(CWE);
    this.template = template(BaseTemplate);
  }

  addScanReport(report: ScanReport) {
    this.reports.push(report);
  }

  async toObject(): Promise<ReportOutput> {
    return {
      title: 'Security Report',
      date: new Date().toLocaleString(),
      counts: this.reports.map(report => report.counts)
        .reduce((previousValue: ScanReport['counts'], currentValue) => ({
          critical: (previousValue.critical ?? 0) + currentValue.critical,
          high: (previousValue.high ?? 0) + currentValue.high,
          moderate: (previousValue.moderate ?? 0) + currentValue.moderate,
          low: (previousValue.low ?? 0) + currentValue.low,
          info: (previousValue.info ?? 0) + currentValue.info,
          total: (previousValue.total ?? 0) + currentValue.total,
        })),
      issues: this.reports.map(r => r.issues).flat(),
    };
  }

  async toJSON(): Promise<[string, Buffer]> {
    return ['json', Buffer.from(JSON.stringify(await this.toObject(), null, 2))];
  }

  async toMarkdown(): Promise<[string, Buffer]> {
    return ['md', Buffer.from(this.template(await this.toObject()))];
  }

  async toHTML(): Promise<[string, Buffer]> {
    return ['html', Buffer.from('')];
  }

  async toPDF(): Promise<[string, Buffer]> {
    return ['pdf', Buffer.from('')];
  }

  async getReport(type: 'markdown' | 'json' | 'html' | 'pdf'): Promise<[string, Buffer]> {
    switch (type) {
    case 'markdown':
      return await this.toMarkdown();
    case 'json':
      return await this.toJSON();
    case 'html':
      return await this.toHTML();
    case 'pdf':
      return await this.toPDF();
    }
  }

  getCweDetails(id: string | number): CWEDetails {
    const parsedId = typeof id === 'string'
      ? id.toLowerCase().replace('cwe-', '')
      : id.toString();

    const [weakness] = select(`//*[local-name(.)='Weakness' and @id='${parsedId}']`, this.cweData);

    if (weakness) {
      const queryable = XmlQuery(XmlReader.parseSync(weakness.toString()));
      const attributes = queryable.attr() as {
        ID: string;
        Name: string;
        Abstraction: string;
        Structure: string;
        Status: string;
        xmlns: string;
      };

      return {
        id: parsedId,
        name: attributes.Name,
        description: queryable.find('Extended_Description')
          .first()
          .text()
          .replace(/(\r\n|\n|\r)/gm, '')
          .replace(/\s+/g, ' ')
          .trim(),
        link: `https://cwe.mitre.org/data/definitions/${parsedId}.html`,
      };
    }

    throw new Error('Could not find CWE');
  }
}
