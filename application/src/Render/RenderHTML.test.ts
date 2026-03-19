import {jest, describe, test, expect, beforeAll} from '@jest/globals';
import {emptyReport, fullReport} from '../../tests/fixtures/Reports';

jest.unstable_mockModule('../Helpers/Dates', () => ({
  toDate: jest.fn().mockReturnValue('01/04/2020'),
  toTime: jest.fn().mockReturnValue('01:30:10'),
  timezone: jest.fn().mockReturnValue('UTC+0'),
}));

const {Report} = await import('../Report');
const {Emitter} = await import('../Emitter');
const {RenderHTML} = await import('./RenderHTML');

describe('RenderHTML', () => {
  describe.each([
    ['empty', emptyReport],
    ['full', fullReport],
  ])('an %s report', (name, reportTemplate) => {
    const onReportRenderStarted = jest.fn();
    const onReportRenderFinished = jest.fn();
    const emitter = new Emitter();
    const report = new Report(emitter);
    const render = new RenderHTML(report, emitter);
    const reportToObject = jest.spyOn(report, 'toObject');
    let output: Buffer;

    beforeAll(async () => {
      emitter.on('report:render:html:started', onReportRenderStarted);
      emitter.on('report:render:html:finished', onReportRenderFinished);
      reportToObject.mockResolvedValue(reportTemplate);
      output = await render.render();
    });

    test('emits event report:render:html:started', () => {
      expect(onReportRenderStarted).toHaveBeenCalled();
    });

    test('emits event report:render:html:finished', () => {
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
