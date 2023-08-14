import BaseTemplate from './assets/report.html.template.md';
import {template, TemplateExecutor} from 'lodash';

export class Render {
  private readonly markdownTemplate: TemplateExecutor;
  private templateFunctions: Record<string, (...args: Array<unknown>) => unknown> = {
    groupBy: (list: Array<unknown>, grouping: string) => {
      const severityOrder = ['critical', 'high', 'moderate', 'low', 'info', 'unknown'];
      const asEntries = Object.entries(
        [{}, ...list]
          .reduce((group: Record<string, Array<unknown>> = {}, item) => {
            if (item) {
              group[item[grouping]] = group[item[grouping]] ?? [];
              group[item[grouping]].push(item);
            }
            return group;
          }));

      asEntries.sort((a, b) => severityOrder.indexOf(a[0]) - severityOrder.indexOf(b[0]));

      return Object.fromEntries(asEntries);
    },
    capitalise: (words: string) =>
      words.split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
  };

  constructor() {
    this.markdownTemplate = template(BaseTemplate);
  }

  async markdown(report: ReportOutput) {
    return Buffer.from(this.markdownTemplate({...report, functions: this.templateFunctions}));
  }
}
