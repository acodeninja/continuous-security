import axios from 'axios';
import {readFile, writeFile} from 'fs/promises';
import ComparePdf from 'compare-pdf';

import {Report} from './Report';
import {Emitter} from './Emitter';

import {CVEResponse} from '../tests/fixtures/CVEResponse';
import {Github} from '../tests/fixtures/OSVResponse';
import {resolve} from 'path';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

(axios.get as jest.Mock).mockImplementation(async (url) => {
  if (url.indexOf('services.nvd.nist.gov') !== -1) return {data: CVEResponse};
  if (url.indexOf('api.osv.dev') !== -1) return {data: Github};
});

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2020, 3, 1, 1, 30, 10, 30));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('fetching vulnerability data', () => {
  const report = new Report(new Emitter());
  report.addScanReport({
    issues: [{
      title: 'test-issue-title',
      description: 'test-issue-description',
      type: 'code smell',
      references: ['CWE-248', 'CVE-2022-25772'],
      fix: 'Unknown',
      severity: 'unknown',
    }, {
      title: 'test-issue-title',
      description: 'test-issue-description',
      type: 'code smell',
      references: ['CWE-248', 'GHSA-f9xv-q969-pqx4'],
      fix: 'Unknown',
      severity: 'unknown',
    }],
    scanner: 'test-scanner',
  });

  beforeAll(async () => {
    await report.toObject();
  });

  test('calls the api for each vulnerability', () => {
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('GHSA-f9xv-q969-pqx4'));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('?cveId=CVE-2022-25772'));
  });

  test('does not fetch the same vulnerability twice', () => {
    expect((axios.get as jest.Mock).mock.calls
      .filter(u => u[0].indexOf('CVE-2022-25772') !== -1))
      .toHaveLength(1);
    expect((axios.get as jest.Mock).mock.calls
      .filter(u => u[0].indexOf('GHSA-f9xv-q969-pqx4') !== -1))
      .toHaveLength(1);
  });
});
describe('producing a report', () => {
  const report = new Report(new Emitter());

  report.addScanReport({
    issues: [{
      title: 'test-issue-title',
      description: 'test-issue-description with excluding term: blacklist',
      type: 'dependency',
      references: ['GHSA-f9xv-q969-pqx4', 'CWE-1004'],
      package: {
        name: 'test-package',
        version: '1.3.24',
      },
      requests: [{
        request: {
          target: 'http://localhost:3000',
          method: 'POST',
          headers: {
            'cache-control': 'no-cache',
            'content-length': '302',
            'content-type': 'application/x-www-form-urlencoded',
            host: 'localhost:3000',
            pragma: 'no-cache',
            referer: 'http://localhost:3000',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          body: 'words=ZAP',
        },
        response: {
          statusCode: 200,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '939',
            'Content-Type': 'text/html; charset=utf-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            ETag: '"3147526947+ident"',
            'Keep-Alive': 'timeout=5',
            'X-Powered-By': 'Express',
          },
          body: '{\n' +
                        '  "menu": [\n' +
                        '    {"value": "New", "onclick": "CreateNewDoc()"},\n' +
                        '    {"value": "Open", "onclick": "OpenDoc()"},\n' +
                        '    {"value": "Close", "onclick": "CloseDoc()"}\n' +
                        '  ]\n' +
                        '}\n',
        },
      }],
      fix: 'Unknown',
      severity: 'unknown',
    }],
    scanner: 'test-scanner',
  });

  report.addScanReport({
    issues: [{
      title: 'test-issue-title',
      description: 'test-issue-description',
      type: 'code smell',
      extracts: [{
        lines: ['5', '7'],
        path: 'scripts/update-cwe.js',
        language: 'javascript',
      }],
      references: ['GHSA-f9xv-q969-pqx4', 'CWE-1004'],
      fix: 'Unknown',
      severity: 'unknown',
    }],
    scanner: 'test-scanner',
  });

  report.addScanReport({
    issues: [{
      title: 'test-issue-title',
      description: 'test-issue-description',
      type: 'code smell',
      references: ['CWE-248'],
      fix: 'Unknown',
      severity: 'unknown',
    }],
    scanner: 'test-scanner',
  });

  describe('in json', () => {
    let jsonReport: Buffer;

    beforeAll(async () => {
      [, jsonReport] = await report.getReport('json');
    });

    test('matches snapshot', () => {
      expect(jsonReport.toString()).toMatchSnapshot();
    });
  });

  describe('in markdown', () => {
    let markdownReport: Buffer;

    beforeAll(async () => {
      [, markdownReport] = await report.getReport('markdown');
    });

    test('matches snapshot', () => {
      expect(markdownReport.toString()).toMatchSnapshot();
    });
  });

  describe('in html', () => {
    let htmlReport: Buffer;

    beforeAll(async () => {
      [, htmlReport] = await report.getReport('html');
    });

    test('matches snapshot', () => {
      expect(htmlReport.toString()).toMatchSnapshot();
    });
  });

  describe('in pdf', () => {
    let pdf: Buffer;

    beforeAll(async () => {
      [, pdf] = await report.getReport('pdf');
      await writeFile('test.pdf', pdf);
    });

    test('matches baseline', async () => {
      const baselinePath = resolve('tests', 'fixtures', 'baseline.report.pdf');
      const comparer = new ComparePdf()
        .actualPdfBuffer(pdf, 'actual.pdf')
        .baselinePdfBuffer(await readFile(baselinePath), baselinePath);

      const comparisonResults =
          await (comparer.compare as unknown as (type?: string) => Promise<{status: string}>)();

      if (comparisonResults.status !== 'passed') {
        console.log('PDF Comparison Failed:', JSON.stringify(comparisonResults, null, 2));
      }

      expect(comparisonResults.status).toEqual('passed');
    });
  });
});
