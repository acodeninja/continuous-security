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
      references: ['CWE-1004'],
      package: {
        name: 'test-package',
        version: '1.3.24',
      },
      fix: 'Unknown',
      severity: 'unknown',
    }],
    scanner: 'test-scanner'
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
      "references": [
        {
          "id": "5839",
          "label": "CWE",
          "url": "https://cwe.mitre.org/data/definitions/5839.html"
        }
      ],
      "package": {
        "name": "test-package",
        "version": "1.3.24"
      },
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

  describe('in markdown', () => {
    let markdownReport: Buffer;

    beforeAll(async () => {
      [, markdownReport] = await report.getReport('markdown');
    });

    test('matches snapshot', () => {
      expect(markdownReport.toString()).toMatchInlineSnapshot(`
"# Security Reporting

## Summary

This security report was conducted on 01/04/2020 at 01:30:10.
A total of 21 issue(s) were found, 1 of which may require immediate attention.

### Contents

* [Issue Statistics](#statistics)
* [Overview of Issues](#overview-of-issues)
* [Vulnerabilities](#vulnerabilities)
* [Additional Information](#additional-information)
  * [What are severity levels?](#what-are-severity-levels)

## Statistics

This report found issues with the following severities.

**Critical**: 1 | **High** 2 | **Medium** 5 | **Low** 4 | **Informational** 3 |  **Unknown** 6

To gain a better understanding of the severity levels please see [the appendix](#what-are-severity-levels).

## Vulnerabilities

### Critical



## Additional Information

### What are severity levels?

Issue severity is scored using the [Common Vulnerability Scoring System](https://www.first.org/cvss/) (CVSS) where
such data is available. Severity levels do not represent the risk associated with an issue as risk depends on your
specific context. Severity scoring does however give an indication of the ease of exploitation and potential scope of an
attacks effect on an application.

#### Critical

Exploitation will likely lead to an attacker gaining administrative access to the application and infrastructure that
supports it. Exploiting critical vulnerabilities is usually trivial and will generally not require prior access to the
application. **A development team should aim to resolve these issues immediately by mitigating or directly resolving the
issue**.

#### High

Exploitation could lead to an attacker gaining elevated access to the application and the infrastructure that supports
it. It is likely that an attacker will not find exploitation trivial. Such exploitation could lead to significant data
loss or downtime.

#### Medium

Exploitation could lead to an attacker gaining limited access to the application. Exploiting vulnerabilities may require
an attacker to manipulate users to gain access to their credentials. Such exploitation could lead to limited data loss
or downtime.

#### Low

Exploitation will likely have very little impact on the application, and it is unlikely that an attacker will gain any
meaningful access to the application. Exploiting an issue of this severity will potentially require physical access to
the infrastructure that supports the application.

#### Informational

While not part of the CVSS scoring specification, several security analysis tools use this severity level to indicate
that an issue is a matter of best practice. It is extremely unlikely that issues with this severity will lead to an
attacker gaining access to any application components.

#### Unknown

This severity level is used when the analysis tool used to perform a scan of the application does not associate any kind
of severity level with the issues or vulnerabilities it finds. Issues with an unknown severity should be investigated by
application developers and project stakeholders to establish the ease of exploitation, scope of any potential impact and
the specific risks associated.
"
`);
    });
  });
});
