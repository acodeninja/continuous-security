import {jest, describe, test, expect, beforeAll} from '@jest/globals';
import {fullReport} from '../../tests/fixtures/Reports';
import {resolve} from 'path';
import {pdfToPng} from 'pdf-to-png-converter';
import pixelmatch from 'pixelmatch';
import {PNG} from 'pngjs';
import {readFile, writeFile} from 'fs/promises';
import {promisify} from 'util';
import {exec} from 'child_process';

jest.unstable_mockModule('../Helpers/Processes', () => ({
  executed: jest.fn(),
}));

jest.unstable_mockModule('../Helpers/Dates', () => ({
  toDate: jest.fn().mockReturnValue('01/04/2020'),
  toTime: jest.fn().mockReturnValue('01:30:10'),
  timezone: jest.fn().mockReturnValue('UTC+0'),
}));

const {executed} = await import('../Helpers/Processes');
const {Report} = await import('../Report');
const {Emitter} = await import('../Emitter');
const {RenderPDF} = await import('./RenderPDF');

async function comparePdfBuffers(
  actualBuffer: Buffer,
  baselineBuffer: Buffer,
  threshold = 0.1,
): Promise<{status: string; message: string}> {
  const actualArray = new Uint8Array(actualBuffer);
  const baselineArray = new Uint8Array(baselineBuffer);
  const [actualPages, baselinePages] = await Promise.all([
    pdfToPng(actualArray.buffer as ArrayBuffer, {disableFontFace: true, verbosityLevel: 0}),
    pdfToPng(baselineArray.buffer as ArrayBuffer, {disableFontFace: true, verbosityLevel: 0}),
  ]);

  if (actualPages.length !== baselinePages.length) {
    return {
      status: 'failed',
      message: `Page count mismatch: actual has ${actualPages.length} pages, ` +
        `baseline has ${baselinePages.length} pages`,
    };
  }

  for (let i = 0; i < actualPages.length; i++) {
    const actual = PNG.sync.read(actualPages[i].content);
    const baseline = PNG.sync.read(baselinePages[i].content);

    if (actual.width !== baseline.width || actual.height !== baseline.height) {
      return {
        status: 'failed',
        message: `Page ${i + 1} dimension mismatch: ` +
          `actual ${actual.width}x${actual.height}, ` +
          `baseline ${baseline.width}x${baseline.height}`,
      };
    }

    const diffPixels = pixelmatch(
      actual.data,
      baseline.data,
      null,
      actual.width,
      actual.height,
      {threshold},
    );

    const totalPixels = actual.width * actual.height;
    const diffPercent = (diffPixels / totalPixels) * 100;

    if (diffPercent > 1) {
      return {
        status: 'failed',
        message: `Page ${i + 1} differs by ${diffPercent.toFixed(2)}% ` +
          `(${diffPixels} pixels)`,
      };
    }
  }

  return {status: 'passed', message: 'PDFs match'};
}

describe('RenderPDF', () => {
  jest.setTimeout(120 * 1000);
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
      (executed as jest.Mock<any>).mockImplementation(async (command: string) =>
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
      const comparisonResults = await comparePdfBuffers(
        output,
        await readFile(baselinePath),
      );

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
        (executed as jest.Mock<any>).mockResolvedValueOnce(false);
        reportToObject.mockResolvedValue(fullReport);
        output = await render.render();
      });

      test('emits event report:render:pdf:started', () => {
        expect(onReportRenderStarted).toHaveBeenCalled();
      });

      test('emits event report:render:pdf:fallback', () => {
        expect(onReportRenderFallback)
          .toHaveBeenCalledWith('Failed to generate with local chrome, falling back to docker');
      });

      test('emits event report:render:pdf:finished', () => {
        expect(onReportRenderFinished).toHaveBeenCalled();
      });

      test('calls Report.toObject', () => {
        expect(reportToObject).toHaveBeenCalledWith();
      });

      test('returns the expected report', async () => {
        const baselinePath = resolve('tests', 'fixtures', 'baseline.report.pdf');
        const comparisonResults = await comparePdfBuffers(
          output,
          await readFile(baselinePath),
        );

        if (comparisonResults.status !== 'passed') {
          await writeFile('test-fallback-rendered.pdf', output);
          console.log(`PDF Comparison Failed: ${comparisonResults.message}`);
        }

        expect(comparisonResults.status).toEqual('passed');
      });
    });
});
