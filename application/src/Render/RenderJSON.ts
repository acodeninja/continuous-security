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
    this.emitter.emit('report:render:json:started');

    const report = await this.report.toObject();
    const output = JSON.stringify(report, null, 2);

    this.emitter.emit('report:render:json:finished');

    return Buffer.from(output);
  }
}
