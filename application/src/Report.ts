import {basename, resolve} from 'path';
import {readFile, writeFile} from 'fs/promises';

import {template, TemplateExecutor} from 'lodash';
import {Converter as Showdown} from 'showdown';

import {Emitter} from './Emitter';
import {translate} from './DataSources/Translations';
import {References} from './DataSources/References';
import {buildImage, runImage} from './Helpers/DockerClient';
import {makeTemporaryFolder} from './Helpers/Files';

import MarkdownTemplate from './assets/report.markdown.template.md';
import PDFTemplate from './assets/report.pdf.template.md';
import HTMLTemplate from './assets/report.html.template.md';
import HTMLTemplateWrapper from './assets/report.html.wrapper.html';
import {executed} from './Helpers/Processes';
import {RenderJSON} from './Render/RenderJSON';
import {RenderMarkdown} from './Render/RenderMarkdown';

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
    const htmlCacheLocation = await makeTemporaryFolder('html-');

    const report = await this.toObject();

    const convert = new Showdown();
    const converted = convert.makeHtml(this.templates.pdf({
      ...report,
      functions: this.reportFunctions,
    }));

    const html = HTMLTemplateWrapper.toString().replace('%%REPORT%%', converted);

    await writeFile(resolve(htmlCacheLocation, 'report.html'), html);

    const pdfPath = resolve(htmlCacheLocation, 'report.pdf');
    const htmlPath = resolve(htmlCacheLocation, 'report.html');

    const chromeRun = await executed(
      `google-chrome \
        --headless \
        --disable-gpu \
        --no-margins \
        --no-pdf-header-footer \
        --print-to-pdf="${pdfPath}" \
        ${htmlPath}`,
    );

    if (chromeRun) return ['pdf', Buffer.from(await readFile(pdfPath))];

    this.emitter.emit('report:pdf', 'Failed to generate with local chrome, falling back to docker');

    const imageHash = await buildImage({
      files: {
        Dockerfile: 'FROM ubuntu:latest\n' +
          'ADD https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb c.deb\n' +
          'RUN apt-get update && apt-get install -y ./c.deb && apt-get clean\n',
      },
    });

    await runImage({
      imageHash,
      command: [
        'google-chrome',
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--no-margins',
        '--no-pdf-header-footer',
        '--print-to-pdf=/output/report.pdf',
        '/output/report.html',
      ],
      volumes: {output: htmlCacheLocation},
    });

    return ['pdf', Buffer.from(await readFile(pdfPath))];
  }

  async getReport(type: 'markdown' | 'json' | 'html' | 'pdf'): Promise<[string, Buffer]> {
    switch (type) {
    case 'markdown':
      return ['md', await (new RenderMarkdown(this, this.emitter)).render()];
    case 'html':
      return await this.toHTML();
    case 'pdf':
      return await this.toPDF();
    case 'json':
      return ['json', await (new RenderJSON(this, this.emitter)).render()];
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

    const withFullExtracts: Array<ReportOutputIssue> =
        await Promise.all(withHighestSeverities.map(async issue => {
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

    return withFullExtracts
      .reduce((grouped: Array<ReportOutputIssue>, item: ReportOutputIssue) => {
        if (item.title) {
          const existingGroupIndex = grouped.findIndex(i =>
            i.title === item.title && i.foundBy === item.foundBy);
          if (existingGroupIndex !== -1) {
            const issue = grouped[existingGroupIndex];
            issue.references = issue.references.concat(item.references);
            issue.references = [...new Set(issue.references)];
            if (issue.extracts) {
              issue.extracts = issue.extracts.concat(item.extracts || []);
            } else {
              issue.extracts = item.extracts;
            }
          } else {
            grouped.push(item);
          }
        }
        return grouped;
      }, []);
  }
}
