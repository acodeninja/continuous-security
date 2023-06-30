import {Report} from './Report';
import {Emitter} from './Emitter';

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
      description: 'test-issue-description',
      type: 'dependency',
      references: ['GHSA-f9xv-q969-pqx4', 'CWE-1004'],
      package: {
        name: 'test-package',
        version: '1.3.24',
      },
      fix: 'Unknown',
      severity: 'unknown',
    }],
    scanner: 'test-scanner'
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
  "title": "Security Report for application",
  "date": "2020-04-01T01:30:10.030Z",
  "overviewOfIssues": [
    {
      "label": "CWE-248",
      "title": "Uncaught Exception",
      "description": "An exception is thrown from a function, but it is not caught.",
      "directLink": "https://cwe.mitre.org/data/definitions/248.html",
      "dataSourceSpecific": {
        "cwe": {
          "extendedDescription": "When an exception is not caught, it may cause the program to crash or expose sensitive information.",
          "background": "",
          "consequences": [
            {
              "scopeImpacts": [
                {
                  "scope": "Availability",
                  "impact": "DoS: Crash, Exit, or Restart"
                },
                {
                  "scope": "Confidentiality",
                  "impact": "Read Application Data"
                }
              ],
              "note": "An uncaught exception could cause the system to be placed in a state that could lead to a crash, exposure of sensitive information or other unintended behaviors."
            }
          ],
          "mitigations": []
        }
      }
    },
    {
      "label": "CWE-1004",
      "title": "Sensitive Cookie Without 'HttpOnly' Flag",
      "description": "The product uses a cookie to store sensitive information, but the cookie is not marked with the HttpOnly flag.",
      "directLink": "https://cwe.mitre.org/data/definitions/1004.html",
      "dataSourceSpecific": {
        "cwe": {
          "extendedDescription": "The HttpOnly flag directs compatible browsers to prevent client-side script from accessing cookies. Including the HttpOnly flag in the Set-Cookie HTTP response header helps mitigate the risk associated with Cross-Site Scripting (XSS) where an attacker's script code might attempt to read the contents of a cookie and exfiltrate information obtained. When set, browsers that support the flag will not reveal the contents of the cookie to a third party via client-side script executed via XSS.",
          "background": "An HTTP cookie is a small piece of data attributed to a specific website and stored on the user's computer by the user's web browser. This data can be leveraged for a variety of purposes including saving information entered into form fields, recording user activity, and for authentication purposes. Cookies used to save or record information generated by the user are accessed and modified by script code embedded in a web page. While cookies used for authentication are created by the website's server and sent to the user to be attached to future requests. These authentication cookies are often not meant to be accessed by the web page sent to the user, and are instead just supposed to be attached to future requests to verify authentication details.",
          "consequences": [
            {
              "scopeImpacts": [
                {
                  "scope": "Confidentiality",
                  "impact": "Read Application Data"
                }
              ],
              "note": "If the HttpOnly flag is not set, then sensitive information stored in the cookie may be exposed to unintended parties."
            },
            {
              "scopeImpacts": [
                {
                  "scope": "Integrity",
                  "impact": "Gain Privileges or Assume Identity"
                }
              ],
              "note": "If the cookie in question is an authentication cookie, then not setting the HttpOnly flag may allow an adversary to steal authentication data (e.g., a session ID) and assume the identity of the user."
            }
          ],
          "mitigations": [
            {
              "phase": "Implementation",
              "description": "Leverage the HttpOnly flag when setting a sensitive cookie in a response.",
              "effectiveness": "High",
              "notes": "While this mitigation is effective for protecting cookies from a browser's own scripting engine, third-party components or plugins may have their own engines that allow access to cookies. Attackers might also be able to use XMLHTTPResponse to read the headers directly and obtain the cookie."
            }
          ]
        }
      }
    }
  ],
  "issues": [
    {
      "title": "test-issue-title",
      "description": "test-issue-description",
      "type": "dependency",
      "references": [
        {
          "label": "GHSA-f9xv-q969-pqx4",
          "title": "Uncaught Exception in yaml",
          "description": "Uncaught Exception in GitHub repository eemeli/yaml starting at version 2.0.0-5 and prior to 2.2.2.",
          "directLink": "https://osv.dev/vulnerability/GHSA-f9xv-q969-pqx4",
          "dataSourceSpecific": {
            "osv": {
              "aliases": [
                "CVE-2023-2251",
                "CWE-248"
              ],
              "severity": "high"
            }
          }
        },
        {
          "label": "CWE-1004",
          "title": "Sensitive Cookie Without 'HttpOnly' Flag",
          "description": "The product uses a cookie to store sensitive information, but the cookie is not marked with the HttpOnly flag.",
          "directLink": "https://cwe.mitre.org/data/definitions/1004.html",
          "dataSourceSpecific": {
            "cwe": {
              "extendedDescription": "The HttpOnly flag directs compatible browsers to prevent client-side script from accessing cookies. Including the HttpOnly flag in the Set-Cookie HTTP response header helps mitigate the risk associated with Cross-Site Scripting (XSS) where an attacker's script code might attempt to read the contents of a cookie and exfiltrate information obtained. When set, browsers that support the flag will not reveal the contents of the cookie to a third party via client-side script executed via XSS.",
              "background": "An HTTP cookie is a small piece of data attributed to a specific website and stored on the user's computer by the user's web browser. This data can be leveraged for a variety of purposes including saving information entered into form fields, recording user activity, and for authentication purposes. Cookies used to save or record information generated by the user are accessed and modified by script code embedded in a web page. While cookies used for authentication are created by the website's server and sent to the user to be attached to future requests. These authentication cookies are often not meant to be accessed by the web page sent to the user, and are instead just supposed to be attached to future requests to verify authentication details.",
              "consequences": [
                {
                  "scopeImpacts": [
                    {
                      "scope": "Confidentiality",
                      "impact": "Read Application Data"
                    }
                  ],
                  "note": "If the HttpOnly flag is not set, then sensitive information stored in the cookie may be exposed to unintended parties."
                },
                {
                  "scopeImpacts": [
                    {
                      "scope": "Integrity",
                      "impact": "Gain Privileges or Assume Identity"
                    }
                  ],
                  "note": "If the cookie in question is an authentication cookie, then not setting the HttpOnly flag may allow an adversary to steal authentication data (e.g., a session ID) and assume the identity of the user."
                }
              ],
              "mitigations": [
                {
                  "phase": "Implementation",
                  "description": "Leverage the HttpOnly flag when setting a sensitive cookie in a response.",
                  "effectiveness": "High",
                  "notes": "While this mitigation is effective for protecting cookies from a browser's own scripting engine, third-party components or plugins may have their own engines that allow access to cookies. Attackers might also be able to use XMLHTTPResponse to read the headers directly and obtain the cookie."
                }
              ]
            }
          }
        },
        {
          "label": "CVE-2023-2251",
          "title": "CVE-2023-2251",
          "description": "Uncaught Exception in GitHub repository eemeli/yaml prior to 2.0.0-5.",
          "directLink": "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-2251",
          "dataSourceSpecific": {
            "cve": {
              "aliases": [
                "CWE-248"
              ],
              "severity": "high"
            }
          }
        },
        {
          "label": "CWE-248",
          "title": "Uncaught Exception",
          "description": "An exception is thrown from a function, but it is not caught.",
          "directLink": "https://cwe.mitre.org/data/definitions/248.html",
          "dataSourceSpecific": {
            "cwe": {
              "extendedDescription": "When an exception is not caught, it may cause the program to crash or expose sensitive information.",
              "background": "",
              "consequences": [
                {
                  "scopeImpacts": [
                    {
                      "scope": "Availability",
                      "impact": "DoS: Crash, Exit, or Restart"
                    },
                    {
                      "scope": "Confidentiality",
                      "impact": "Read Application Data"
                    }
                  ],
                  "note": "An uncaught exception could cause the system to be placed in a state that could lead to a crash, exposure of sensitive information or other unintended behaviors."
                }
              ],
              "mitigations": []
            }
          }
        }
      ],
      "package": {
        "name": "test-package",
        "version": "1.3.24"
      },
      "fix": "Unknown",
      "severity": "high",
      "foundBy": "test-scanner"
    },
    {
      "title": "test-issue-title",
      "description": "test-issue-description",
      "type": "code smell",
      "references": [
        {
          "label": "CWE-248",
          "title": "Uncaught Exception",
          "description": "An exception is thrown from a function, but it is not caught.",
          "directLink": "https://cwe.mitre.org/data/definitions/248.html",
          "dataSourceSpecific": {
            "cwe": {
              "extendedDescription": "When an exception is not caught, it may cause the program to crash or expose sensitive information.",
              "background": "",
              "consequences": [
                {
                  "scopeImpacts": [
                    {
                      "scope": "Availability",
                      "impact": "DoS: Crash, Exit, or Restart"
                    },
                    {
                      "scope": "Confidentiality",
                      "impact": "Read Application Data"
                    }
                  ],
                  "note": "An uncaught exception could cause the system to be placed in a state that could lead to a crash, exposure of sensitive information or other unintended behaviors."
                }
              ],
              "mitigations": []
            }
          }
        }
      ],
      "fix": "Unknown",
      "severity": "unknown",
      "foundBy": "test-scanner"
    }
  ],
  "counts": {
    "critical": 0,
    "high": 1,
    "moderate": 0,
    "low": 0,
    "info": 0,
    "unknown": 1,
    "total": 2
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
"# Security Report for application

## Summary

This security report was conducted on 01/04/2020 at 01:30:10.
A total of 2 issue(s) were found, 0 of which may require immediate attention.

### Contents

* [Issue Statistics](#statistics)
* [Overview of Issues](#overview-of-issues)
* [Vulnerabilities](#vulnerabilities)
* [Additional Information](#additional-information)
  * [What are severity levels?](#what-are-severity-levels)

## Statistics

This report found issues with the following severities.

**Critical**: 0 | **High** 1 | **Medium** 0 | **Low** 0 | **Informational** 0 | **Unknown** 1

To gain a better understanding of the severity levels please see [the appendix](#what-are-severity-levels).

## Overview of Issues

### Uncaught Exception

An exception is thrown from a function, but it is not caught.


When an exception is not caught, it may cause the program to crash or expose sensitive information.


#### Consequences

Using a vulnerability of this type an attacker may be able to affect the system in the following ways. 


* **Availability**: DoS: Crash, Exit, or Restart
* **Confidentiality**: Read Application Data



 > An uncaught exception could cause the system to be placed in a state that could lead to a crash, exposure of sensitive information or other unintended behaviors.


For more information see [CWE-248](https://cwe.mitre.org/data/definitions/248.html).

### Sensitive Cookie Without 'HttpOnly' Flag

The product uses a cookie to store sensitive information, but the cookie is not marked with the HttpOnly flag.

An HTTP cookie is a small piece of data attributed to a specific website and stored on the user's computer by the user's web browser. This data can be leveraged for a variety of purposes including saving information entered into form fields, recording user activity, and for authentication purposes. Cookies used to save or record information generated by the user are accessed and modified by script code embedded in a web page. While cookies used for authentication are created by the website's server and sent to the user to be attached to future requests. These authentication cookies are often not meant to be accessed by the web page sent to the user, and are instead just supposed to be attached to future requests to verify authentication details.

The HttpOnly flag directs compatible browsers to prevent client-side script from accessing cookies. Including the HttpOnly flag in the Set-Cookie HTTP response header helps mitigate the risk associated with Cross-Site Scripting (XSS) where an attacker's script code might attempt to read the contents of a cookie and exfiltrate information obtained. When set, browsers that support the flag will not reveal the contents of the cookie to a third party via client-side script executed via XSS.


#### Consequences

Using a vulnerability of this type an attacker may be able to affect the system in the following ways. 


* **Confidentiality**: Read Application Data



 > If the HttpOnly flag is not set, then sensitive information stored in the cookie may be exposed to unintended parties.

* **Integrity**: Gain Privileges or Assume Identity



 > If the cookie in question is an authentication cookie, then not setting the HttpOnly flag may allow an adversary to steal authentication data (e.g., a session ID) and assume the identity of the user.


For more information see [CWE-1004](https://cwe.mitre.org/data/definitions/1004.html).


## Vulnerabilities

### High Severity

#### test-issue-title (version 1.3.24)

**Severity**: [High](#High) | **Type**: dependency | **Fix**: Unknown | **Found By**: [test-scanner](https://www.npmjs.com/package/test-scanner)

test-issue-description


##### References

[GHSA-f9xv-q969-pqx4](https://osv.dev/vulnerability/GHSA-f9xv-q969-pqx4) | [CWE-1004](https://cwe.mitre.org/data/definitions/1004.html) | [CVE-2023-2251](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-2251) | [CWE-248](https://cwe.mitre.org/data/definitions/248.html)

### Unknown Severity

#### test-issue-title 

**Severity**: [Unknown](#Unknown) | **Type**: code smell | **Fix**: Unknown | **Found By**: [test-scanner](https://www.npmjs.com/package/test-scanner)

test-issue-description


##### References

[CWE-248](https://cwe.mitre.org/data/definitions/248.html)



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
