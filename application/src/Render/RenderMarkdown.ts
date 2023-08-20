import {template} from 'lodash';

import {Report} from '../Report';
import {Emitter} from '../Emitter';
import {groupToObjectBy} from '../Helpers/Arrays';
import {capitalise} from '../Helpers/Strings';

import MarkdownTemplate from '../assets/report.markdown.template.md';

export class RenderMarkdown {
  private report: Report;
  private emitter: Emitter;

  constructor(report: Report, emitter: Emitter) {
    this.report = report;
    this.emitter = emitter;
  }

  async render(): Promise<Buffer> {
    this.emitter.emit('report:render:markdown:started');

    const report = await this.report.toObject();
    const output = template(MarkdownTemplate)({...report, functions: {
      groupToObjectBy,
      capitalise,
    }});

    this.emitter.emit('report:render:markdown:finished');

    return Buffer.from(output);
  }
}
