import {Report} from '../Report';
import {Emitter} from '../Emitter';
import {RenderJSON} from './RenderJSON';

import {emptyReport, fullReport} from '../../tests/fixtures/Reports';

describe('RenderJSON', () => {
  describe.each([
    ['empty', emptyReport],
    ['full', fullReport],
  ])('an %s report', (name, reportTemplate) => {
    const onReportRenderStarted = jest.fn();
    const onReportRenderFinished = jest.fn();
    const emitter = new Emitter();
    const report = new Report(emitter);
    const render = new RenderJSON(report, emitter);
    const reportToObject = jest.spyOn(report, 'toObject');
    let output: Buffer;

    beforeAll(async () => {
      emitter.on('report:render:json:started', onReportRenderStarted);
      emitter.on('report:render:json:finished', onReportRenderFinished);
      reportToObject.mockResolvedValue(reportTemplate);
      output = await render.render();
    });

    test('emits event report:render:json:started', () => {
      expect(onReportRenderStarted).toHaveBeenCalled();
    });

    test('emits event report:render:json:finished', () => {
      expect(onReportRenderFinished).toHaveBeenCalled();
    });

    test('calls Report.toObject', () => {
      expect(reportToObject).toHaveBeenCalledWith();
    });

    test('returns valid json', () => {
      expect(() => JSON.parse(output.toString())).not.toThrow();
    });

    test('returns the expected report', () => {
      expect(output.toString()).toEqual(JSON.stringify(reportTemplate, null, 2));
    });
  });
});
