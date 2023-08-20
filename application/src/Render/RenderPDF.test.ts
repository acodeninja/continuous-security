import {Report} from '../Report';
import {Emitter} from '../Emitter';
import {RenderPDF} from './RenderPDF';

import {fullReport} from '../../tests/fixtures/Reports';
import {resolve} from 'path';
import ComparePdf from 'compare-pdf';
import {readFile, writeFile} from 'fs/promises';
import {executed} from '../Helpers/Processes';
import {promisify} from 'util';
import {exec} from 'child_process';

jest.mock('../Helpers/Processes');

describe('RenderPDF', () => {
  describe('a report rendered with chrome', () => {
    const onReportRenderStarted = jest.fn();
    const onReportRenderFallback = jest.fn();
    const onReportRenderFinished = jest.fn();
    const emitter = new Emitter();
    const report = new Report(emitter);
    const render = new RenderPDF(report, emitter);
    const reportToObject = jest.spyOn(report, 'toObject');
    let output: Buffer;

    beforeAll(async () => {
      emitter.on('report:render:pdf:started', onReportRenderStarted);
      emitter.on('report:render:pdf:fallback', onReportRenderFallback);
      emitter.on('report:render:pdf:finished', onReportRenderFinished);
      (executed as jest.Mock).mockImplementationOnce(async (command: string) =>
        await promisify(exec)(command)
          .then(() => true)
          .catch(() => false));
      reportToObject.mockResolvedValue(fullReport);
      output = await render.render();
    });

    test('emits event report:render:pdf:started', () => {
      expect(onReportRenderStarted).toHaveBeenCalled();
    });

    test('does not emit event report:render:pdf:fallback', () => {
      expect(onReportRenderFallback).not.toHaveBeenCalled();
    });

    test('emits event report:render:pdf:finished', () => {
      expect(onReportRenderFinished).toHaveBeenCalled();
    });

    test('calls Report.toObject', () => {
      expect(reportToObject).toHaveBeenCalledWith();
    });

    test('returns the expected report', async () => {
      const baselinePath = resolve('tests', 'fixtures', 'baseline.report.pdf');
      const comparer = new ComparePdf()
        .actualPdfBuffer(output, 'actual.pdf')
        .baselinePdfBuffer(await readFile(baselinePath), baselinePath);

      const comparisonResults =
          await (comparer.compare as unknown as (type?: string) =>
              Promise<{status: string, message: string}>)();

      if (comparisonResults.status !== 'passed') {
        await writeFile('test-chrome-rendered.pdf', output);
        console.log(`PDF Comparison Failed: ${comparisonResults.message}`);
      }

      expect(comparisonResults.status).toEqual('passed');
    });
  });

  if (process.env['WITH_FALLBACK_REPORT_RENDER'])
    describe('a report rendered with fallback method', () => {
      const onReportRenderStarted = jest.fn();
      const onReportRenderFallback = jest.fn();
      const onReportRenderFinished = jest.fn();
      const emitter = new Emitter();
      const report = new Report(emitter);
      const render = new RenderPDF(report, emitter);
      const reportToObject = jest.spyOn(report, 'toObject');
      let output: Buffer;

      beforeAll(async () => {
        emitter.on('report:render:pdf:started', onReportRenderStarted);
        emitter.on('report:render:pdf:fallback', onReportRenderFallback);
        emitter.on('report:render:pdf:finished', onReportRenderFinished);
        (executed as jest.Mock).mockResolvedValueOnce(false);
        reportToObject.mockResolvedValue(fullReport);
        output = await render.render();
      });

      test('emits event report:render:pdf:started', () => {
        expect(onReportRenderStarted).toHaveBeenCalled();
      });

      test('emits event report:render:pdf:fallback', () => {
        expect(onReportRenderFallback).toHaveBeenCalledWith();
      });

      test('emits event report:render:pdf:finished', () => {
        expect(onReportRenderFinished).toHaveBeenCalled();
      });

      test('calls Report.toObject', () => {
        expect(reportToObject).toHaveBeenCalledWith();
      });

      test('returns the expected report', async () => {
        const baselinePath = resolve('tests', 'fixtures', 'baseline.report.pdf');
        const comparer = new ComparePdf()
          .actualPdfBuffer(output, 'actual.pdf')
          .baselinePdfBuffer(await readFile(baselinePath), baselinePath);

        const comparisonResults =
          await (comparer.compare as unknown as (type?: string) =>
              Promise<{status: string, message: string}>)();

        if (comparisonResults.status !== 'passed') {
          await writeFile('test-fallback-rendered.pdf', output);
          console.log(`PDF Comparison Failed: ${comparisonResults.message}`);
        }

        expect(comparisonResults.status).toEqual('passed');
      });
    });
});
