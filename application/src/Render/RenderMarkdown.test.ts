import {Report} from '../Report';
import {Emitter} from '../Emitter';
import {RenderMarkdown} from './RenderMarkdown';

import {emptyReport, fullReport} from '../../tests/fixtures/Reports';

describe('RenderMarkdown', () => {
  describe.each([
    ['empty', emptyReport],
    ['full', fullReport],
  ])('an %s report', (name, reportTemplate) => {
    const onReportRenderStarted = jest.fn();
    const onReportRenderFinished = jest.fn();
    const emitter = new Emitter();
    const report = new Report(emitter);
    const render = new RenderMarkdown(report, emitter);
    const reportToObject = jest.spyOn(report, 'toObject');
    let output: Buffer;

    beforeAll(async () => {
      emitter.on('report:render:markdown:started', onReportRenderStarted);
      emitter.on('report:render:markdown:finished', onReportRenderFinished);
      reportToObject.mockResolvedValue(reportTemplate);
      output = await render.render();
    });

    test('emits event report:render:markdown:started', () => {
      expect(onReportRenderStarted).toHaveBeenCalled();
    });

    test('emits event report:render:markdown:finished', () => {
      expect(onReportRenderFinished).toHaveBeenCalled();
    });

    test('calls Report.toObject', () => {
      expect(reportToObject).toHaveBeenCalledWith();
    });

    test('returns the expected report', () => {
      expect(output.toString()).toMatchSnapshot();
    });
  });
});
