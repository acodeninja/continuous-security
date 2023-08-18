import {template, TemplateExecutor} from 'lodash';
import {basename, resolve} from 'path';
import {readFile, writeFile} from 'fs/promises';
import {Converter as Showdown} from 'showdown';
import {promisify} from 'util';
import {exec} from 'child_process';

import {Emitter} from './Emitter';
import {translate} from './DataSources/Translations';
import {References} from './DataSources/References';
import {makeTemporaryFolder} from './Helpers/Files';

import MarkdownTemplate from './assets/report.markdown.template.md';
import PDFTemplate from './assets/report.pdf.template.md';
import HTMLTemplate from './assets/report.html.template.md';
import HTMLTemplateWrapper from './assets/report.html.wrapper.html';

export class Report {
  private readonly templates: Record<string, TemplateExecutor>;
  private reports: Array<ScanReport> = [];
  private cached: ReportOutput;
  private emitter: Emitter;
  private references: References;
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
    this.emitter = emitter;
    this.references = new References(emitter);
    this.templates = {
      markdown: template(MarkdownTemplate),
      html: template(HTMLTemplate),
      pdf: template(PDFTemplate),
    };
  }

  addScanReport(report: ScanReport): void {
    this.reports.push(report);
  }

  async toObject(): Promise<ReportOutput> {
    if (this.cached) return this.cached;

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

    this.cached = JSON.parse(JSON.stringify({
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
    }), (key, value) => {
      if (
        String(value).length === 24 &&
        String(value).match(/\d{4}-\d{2}-\d{2}T(\d{2}:){2}\d{2}.\d{3}Z/)
      ) return new Date(value);

      if (key === 'code' || key === 'target' || key === 'name') return value;

      return typeof value === 'string' ? translate(value) : value;
    });

    return this.cached;
  }

  async toJSON(): Promise<[string, Buffer]> {
    const report = await this.toObject();
    this.emitter.emit('report:finished', '');

    return ['json', Buffer.from(JSON.stringify(report, null, 2))];
  }

  async toMarkdown(): Promise<[string, Buffer]> {
    const report = await this.toObject();
    this.emitter.emit('report:finished', '');

    return [
      'md',
      Buffer.from(this.templates.markdown({...report, functions: this.reportFunctions})),
    ];
  }

  async toHTML(): Promise<[string, Buffer]> {
    const report = await this.toObject();
    this.emitter.emit('report:finished', '');

    const convert = new Showdown();
    const converted = convert.makeHtml(this.templates.html({
      ...report,
      functions: this.reportFunctions,
    }));

    const html = HTMLTemplateWrapper.toString().replace('%%REPORT%%', converted);

    return ['html', Buffer.from(html)];
  }

  async toPDF(): Promise<[string, Buffer]> {
    const htmlCacheLocation = await makeTemporaryFolder('html');

    const report = await this.toObject();
    this.emitter.emit('report:finished', '');

    const convert = new Showdown();
    const converted = convert.makeHtml(this.templates.pdf({
      ...report,
      functions: this.reportFunctions,
    }));

    const html = HTMLTemplateWrapper.toString().replace('%%REPORT%%', converted);

    await writeFile(resolve(htmlCacheLocation, 'report.html'), html);

    const pdfPath = resolve(htmlCacheLocation, 'report.pdf');
    const htmlPath = resolve(htmlCacheLocation, 'report.html');

    // chrome --headless --disable-gpu --print-to-pdf https://www.chromestatus.com/

    try {
      await promisify(exec)(
        `google-chrome \
        --headless \
        --disable-gpu \
        --no-margins \
        --no-pdf-header-footer \
        --print-to-pdf="${pdfPath}" \
        ${htmlPath}`,
      );
    } catch (e) {
      console.log(e);
    }

    return ['pdf', Buffer.from(await readFile(pdfPath))];
  }

  async getReport(type: 'markdown' | 'json' | 'html' | 'pdf'): Promise<[string, Buffer]> {
    this.emitter.emit('report:started', `generating output report in ${type}`);
    switch (type) {
    case 'markdown':
      return await this.toMarkdown();
    case 'html':
      return await this.toHTML();
    case 'pdf':
      return await this.toPDF();
    case 'json':
      return await this.toJSON();
    }
  }

  private async getIssues(): Promise<Array<ReportOutputIssue>> {
    const withFoundBy = this.reports.map(r => r.issues.map(issue => ({
      ...issue,
      foundBy: r.scanner,
    }))).flat();

    const withExpandedReferences = [];

    for (const issue of withFoundBy) {
      withExpandedReferences.push({
        ...issue,
        references: issue.references ? await this.references.getAll(issue.references) : [],
      });
    }

    const withHighestSeverities = withExpandedReferences.map(i => {
      const severities = i.references
        .map((r: ReportOutputIssueReference) => r.dataSourceSpecific?.osv?.severity)
        .concat(i.severity)
        .filter((s: ReportOutputIssue['severity'] | undefined) => !!s);

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
