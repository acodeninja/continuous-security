import {Report} from '../Report';
import {Emitter} from '../Emitter';

export class RenderJSON {
  private report: Report;
  private emitter: Emitter;

  constructor(report: Report, emitter: Emitter) {
    this.report = report;
    this.emitter = emitter;
  }

  async render(): Promise<Buffer> {
    this.emitter.emit('report:render:json');

    return Buffer.from(JSON.stringify(await this.report.toObject(), null, 2));
  }
}
