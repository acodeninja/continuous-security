import axios from 'axios';

import {Report} from './Report';
import {Emitter} from './Emitter';

import {CVEResponse} from '../tests/fixtures/CVEResponse';
import {Github} from '../tests/fixtures/OSVResponse';

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation(async (url) => {
    if (url.indexOf('services.nvd.nist.gov') !== -1) return {data: CVEResponse};
    if (url.indexOf('api.osv.dev') !== -1) return {data: Github};
  }),
}));

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
  const onEvent = jest.fn();
  const emitter = new Emitter();
  emitter.on('*', onEvent);
  const report = new Report(emitter);

  report.addScanReport({
    issues: [{
      title: 'web-test-issue-title',
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
          body: JSON.stringify({
            menu: [
              {value: 'New', onclick: 'CreateNewDoc()'},
              {value: 'Open', onclick: 'OpenDoc()'},
              {value: 'Close', onclick: 'CloseDoc()'},
            ],
          }, null, 2),
        },
      }],
      fix: 'Unknown',
      severity: 'unknown',
    }],
    scanner: 'test-scanner',
  });

  report.addScanReport({
    issues: [{
      title: 'code-test-issue-title',
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
      title: 'code-test-issue-title',
      description: 'test-issue-description',
      type: 'code smell',
      references: ['CWE-248'],
      fix: 'Unknown',
      severity: 'unknown',
    }],
    scanner: 'test-scanner',
  });

  describe('grouping issues', () => {
    const report = new Report(new Emitter());

    report.addScanReport({
      issues: new Array<ScanReportIssue>(5).fill({
        title: 'test-issue-title',
        description: 'test-issue-description',
        type: 'code smell',
        references: ['CWE-248'],
        extracts: [{
          language: 'python',
          code: 'things\nand\nstuff',
          path: __filename,
          lines: ['2', '6'],
        }],
        fix: 'Unknown',
        severity: 'unknown',
      }),
      scanner: 'test-scanner',
    });

    test('groups issues', async () => {
      const reportObject = await report.toObject();

      expect(reportObject).toEqual({
        title: 'Security Report for application',
        date: new Date,
        counts: {critical: 0, high: 0, info: 0, low: 0, moderate: 0, total: 1, unknown: 1},
        overviewOfIssues: [{
          dataSourceSpecific: {
            cwe: {
              background: '',
              consequences: [{
                note: expect.stringContaining('An uncaught exception'),
                scopeImpacts: [{
                  impact: 'DoS: Crash, Exit, or Restart',
                  scope: 'Availability',
                }, {
                  impact: 'Read Application Data',
                  scope: 'Confidentiality',
                }],
              }],
              extendedDescription: expect.stringContaining('When an exception is not caught'),
              mitigations: [],
            },
          },
          description: 'An exception is thrown from a function, but it is not caught.',
          directLink: 'https://cwe.mitre.org/data/definitions/248.html',
          label: 'CWE-248',
          title: 'Uncaught Exception',
        }],
        summaryImpacts: [{
          impacts: ['DoS: Crash, Exit, or Restart'],
          scope: 'Availability',
        }, {
          impacts: ['Read Application Data'],
          scope: 'Confidentiality',
        }],
        issues: [{
          description: 'test-issue-description',
          extracts: new Array(5).fill({
            code: expect.stringContaining('import'),
            language: 'python',
            lines: ['2', '6'],
            path: expect.stringContaining('application/src/Report'),
          }),
          fix: 'Unknown',
          foundBy: 'test-scanner',
          references: [{
            dataSourceSpecific: {
              cwe: {
                background: '',
                consequences: [{
                  note: expect.stringContaining('An uncaught exception'),
                  scopeImpacts: [{
                    impact: 'DoS: Crash, Exit, or Restart',
                    scope: 'Availability',
                  }, {
                    impact: 'Read Application Data',
                    scope: 'Confidentiality',
                  }],
                }],
                extendedDescription: expect.stringContaining('When an exception is not caught'),
                mitigations: [],
              },
            },
            description: 'An exception is thrown from a function, but it is not caught.',
            directLink: 'https://cwe.mitre.org/data/definitions/248.html',
            label: 'CWE-248',
            title: 'Uncaught Exception',
          }],
          severity: 'unknown',
          title: 'test-issue-title',
          type: 'code smell',
        }],
      });
    });
  });
});
