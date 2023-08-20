import {template} from 'lodash';

import {Report} from '../Report';
import {Emitter} from '../Emitter';
import {groupToObjectBy} from '../Helpers/Arrays';
import {capitalise} from '../Helpers/Strings';

import HTMLTemplate from '../assets/report.html.template.md';
import HTMLTemplateWrapper from '../assets/report.html.wrapper.html';
import {Converter as Showdown} from 'showdown';
import {timezone, toDate, toTime} from '../Helpers/Dates';

export class RenderHTML {
  private report: Report;
  private emitter: Emitter;

  constructor(report: Report, emitter: Emitter) {
    this.report = report;
    this.emitter = emitter;
  }

  async render(): Promise<Buffer> {
    this.emitter.emit('report:render:html:started');

    const report = await this.report.toObject();
    const convert = new Showdown();

    const innerReport = convert.makeHtml(template(HTMLTemplate)({...report, functions: {
      groupToObjectBy,
      capitalise,
      toDate,
      toTime,
      timezone,
    }}));

    const output = HTMLTemplateWrapper.toString().replace('%%REPORT%%', innerReport);

    this.emitter.emit('report:render:html:finished');

    return Buffer.from(output);
  }
}
