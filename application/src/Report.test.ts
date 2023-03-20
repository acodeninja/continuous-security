import {Report} from './Report';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2020, 3, 1, 1, 30, 10, 30));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('producing a report', () => {
  const report = new Report();
  report.addScanReport({
    counts: {critical: 1, high: 2, info: 3, low: 4, moderate: 5, unknown: 6, total: 21},
    issues: [{
      title: 'test-issue-title',
      description: 'test-issue-description',
      type: 'dependency',
      cwe: ['5839'],
      package: 'test-package',
      fix: 'Unknown',
      severity: 'unknown',
    }],
    scanner: 'test-scanner'
  });

  describe('in markdown', () => {
    let markdownReport: Buffer;

    beforeAll(async () => {
      [, markdownReport] = await report.getReport('markdown');
    });

    test('matches snapshot', () => {
      expect(markdownReport.toString()).toMatchInlineSnapshot(`
"
title: Security Reporting
date: 01/04/2020
critical: 1
high: 2
moderate: 5
low: 4
info: 3
unknown: 6
total: 21

issue title: test-issue-title
issue description: test-issue-description
cwe refs: 5839, 
issue type: dependency
issue severity: unknown
issue package: test-package
issue found by: test-scanner
issue fix: unknown

"
`);
    });
  });

  describe('in json', () => {
    let jsonReport: Buffer;

    beforeAll(async () => {
      [, jsonReport] = await report.getReport('json');
    });

    test('matches snapshot', () => {
      expect(jsonReport.toString()).toMatchInlineSnapshot(`
"{
  "title": "Security Reporting",
  "date": "2020-04-01T01:30:10.030Z",
  "issues": [
    {
      "title": "test-issue-title",
      "description": "test-issue-description",
      "type": "dependency",
      "cwe": [
        "5839"
      ],
      "package": "test-package",
      "fix": "Unknown",
      "severity": "unknown",
      "foundBy": "test-scanner"
    }
  ],
  "counts": {
    "critical": 1,
    "high": 2,
    "info": 3,
    "low": 4,
    "moderate": 5,
    "unknown": 6,
    "total": 21
  }
}"
`);
    });
  });
});
