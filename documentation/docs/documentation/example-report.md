# Security Report for Example Application

This security report was conducted on 05/03/2023 at 15:46. A total of 4 issue(s) were found, 2 of which may require
immediate attention.

Contents

* [Issue Statistics](#issue-statistics)
* [Overview of Issues](#overview-of-issues)
* [Vulnerabilities](#vulnerabilities)
* [Additional Information](#additional-information)
  * [What are severity levels?](#what-are-severity-levels)

## Issue Statistics

This report found issues with the following severities.

**Critical** 2 | **High** 1 | **Medium** 1 | **Low** 0 | **Informational** 0 | **Unknown** 0

To gain a better understanding of the severity levels please see [the appendix](#what-are-severity-levels).

## Overview of Issues

The scanned application potentially suffers from the following issues.

### [CWE-235](https://cwe.mitre.org/data/definitions/235.html): Improper Handling of Extra Parameters

The product does not handle or incorrectly handles when the number of parameters, fields, or arguments with the same 
name exceeds the expected amount.

### [CWE-89](https://cwe.mitre.org/data/definitions/89.html): Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')

Without sufficient removal or quoting of SQL syntax in user-controllable inputs, the generated SQL query can cause those 
inputs to be interpreted as SQL instead of ordinary user data. This can be used to alter query logic to bypass security 
checks, or to insert additional statements that modify the back-end database, possibly including execution of system 
commands.

SQL injection has become a common issue with database-driven websites. The flaw is easily detected, and easily 
exploited, and as such, any site or product package with even a minimal user base is likely to be subject to an 
attempted attack of this kind. This flaw depends on the fact that SQL makes no real distinction between the control and 
data planes.

### [CWE-327](https://cwe.mitre.org/data/definitions/327.html): Use of a Broken or Risky Cryptographic Algorithm

Cryptographic algorithms are the methods by which data is scrambled to prevent observation or influence by unauthorized 
actors. Insecure cryptography can be exploited to expose sensitive information, modify data in unexpected ways, spoof 
identities of other users or devices, or other impacts.

It is very difficult to produce a secure algorithm, and even high-profile algorithms by accomplished cryptographic 
experts have been broken. Well-known techniques exist to break or weaken various kinds of cryptography. Accordingly, 
there are a small number of well-understood and heavily studied algorithms that should be used by most products. Using a 
non-standard or known-insecure algorithm is dangerous because a determined adversary may be able to break the algorithm
and compromise whatever data has been protected.

Since the state of cryptography advances so rapidly, it is common for an algorithm to be considered "unsafe" even if it 
was once thought to be strong. This can happen when new attacks are discovered, or if computing power increases so much 
that the cryptographic algorithm no longer provides the amount of protection that was originally thought.

For a number of reasons, this weakness is even more challenging to manage with hardware deployment of cryptographic 
algorithms as opposed to software implementation. First, if a flaw is discovered with hardware-implemented cryptography, 
the flaw cannot be fixed in most cases without a recall of the product, because hardware is not easily replaceable like 
software. Second, because the hardware product is expected to work for years, the adversary's computing power will only 
increase over time.

### [CWE-1333](https://cwe.mitre.org/data/definitions/1333.html): Inefficient Regular Expression Complexity

Some regular expression engines have a feature called "backtracking". If the token cannot match, the engine "backtracks" 
to a position that may result in a different token that can match.

Backtracking becomes a weakness if all of these conditions are met:
* The number of possible backtracking attempts are exponential relative to the length of the input.
* The input can fail to match the regular expression.
* The input can be long enough.

Attackers can create crafted inputs that intentionally cause the regular expression to use excessive backtracking in a 
way that causes the CPU consumption to spike.

## Vulnerabilities

### Critical

#### Vulnerability in dependency `express-param`

**Severity**: Critical | **Type**: Dependency | **Fix**: Upgrade
| **Found By**: [npm-audit](https://www.npmjs.com/package/@continuous-security/scanner-npm-audit)

A vulnerability was found in flitto express-param up to 0.x. It has been classified as critical. This affects an unknown 
part of the file lib/fetchParams.js. The manipulation leads to improper handling of extra parameters. It is possible to 
initiate the attack remotely. Upgrading to version 1.0.0 can address this issue. The name of the patch is 
db94f7391ad0a16dcfcba8b9be1af385b25c42db. It is recommended to upgrade the affected component. The identifier VDB-217149 
was assigned to this vulnerability.

[CVE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-20160)
| [GitHub Advisory](https://github.com/advisories/GHSA-fr54-72wr-cqvq)
| [CWE](https://cwe.mitre.org/data/definitions/235.html)

####  Vulnerability in dependency `sequelize`

**Severity**: Critical | **Type**: Dependency | **Fix**: Upgrade
| **Found By**: [npm-audit](https://www.npmjs.com/package/@continuous-security/scanner-npm-audit)

Sequelize is a Node.js ORM tool. In versions prior to 6.19.1 a SQL injection exploit exists related to replacements. 
Parameters which are passed through replacements are not properly escaped which can lead to arbitrary SQL injection 
depending on the specific queries in use. The issue has been fixed in Sequelize 6.19.1. Users are advised to upgrade. 
Users unable to upgrade should not use the `replacements` and the `where` option in the same query.

[CVE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-25813)
| [GitHub Advisory](https://github.com/advisories/GHSA-wrh9-cjv3-2hpw)
| [CWE](https://cwe.mitre.org/data/definitions/89.html)


### High

#### Use of a Broken or Risky Cryptographic Algorithm

**Severity**: High | **Type**: Code Smell | **Fix**: Unknown
| **Found By**: [njsscan](https://www.npmjs.com/package/@continuous-security/scanner-njsscan)

The product uses a broken or risky cryptographic algorithm or protocol.

[CWE](https://cwe.mitre.org/data/definitions/327.html)

##### Instances

`main.js` (starting at line 2)
```javascript
require('crypto')
    .createHash('md5')
```

### Medium

#### Unsafe regex

**Severity**: Medium | **Type**: Code Smell | **Fix**: Unknown
| **Found By**: [njsscan](https://www.npmjs.com/package/@continuous-security/scanner-njsscan)

A RegEx has been detected as unsafe and may be used for a ReDoS attack.

[CWE](https://cwe.mitre.org/data/definitions/1333.html)

##### Instances

`node_modules/squirrelly/dist/browser/squirrelly.dev.js` (starting at line 141)
```javascript
var singleQuoteReg = /'(?:\\[\s\w"'\\`]|[^\n\r'\\])*?/g;
```

`node_modules/squirrelly/dist/squirrelly.cjs.js` (starting at line 167)
```javascript
var singleQuoteReg = /'(?:\\[\s\w"'\\`]|[^\n\r'\\])*?/g;
```

`node_modules/squirrelly/dist/squirrelly.es.js` (starting at line 163)
```javascript
var singleQuoteReg = /'(?:\\[\s\w"'\\`]|[^\n\r'\\])*?/g;
```

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
