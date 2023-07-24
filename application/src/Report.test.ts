import axios from 'axios';
import {Report} from './Report';
import {Emitter} from './Emitter';

import {CVEResponse} from '../tests/fixtures/CVEResponse';
import {Github} from '../tests/fixtures/OSVResponse';

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
});
