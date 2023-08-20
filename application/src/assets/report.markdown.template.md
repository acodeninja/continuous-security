# <%= title %>

# Summary

This security report was conducted on <%= date.toLocaleDateString() %> at <%= date.toLocaleTimeString() %> (UTC<%= (date.getTimezoneOffset()/-60 >= 0 ? '+' : '') + date.getTimezoneOffset()/-60 %>).
A total of <%= counts.total %> issue(s) were found, <%= counts.critical %> of which may require immediate attention.

This report is produced by running automated security scanning tools, which will likely not detect
all vulnerabilities present. **It is not a replacement for a manual analysis of the application**.
<% if (summaryImpacts) { %>
The following technical impacts may arise if an adversary successfully exploits one of the issues found by this scan.
<% summaryImpacts.forEach(({scope, impacts}) => { %>
* **<%= scope %>**<% if (impacts.length) { %>: <%= impacts.join(', ') %><% } %><% }) %><% } %>

# Statistics

This report found issues with the following severities.

**Critical**: <%= counts.critical %> | **High** <%= counts.high %> | **Medium** <%= counts.moderate %> | **Low** <%= counts.low %> | **Informational** <%= counts.info %> | **Unknown** <%= counts.unknown %>

To gain a better understanding of the severity levels please see [the appendix](#what-are-severity-levels).

## Contents

* [Summary](#summary)
* [Issue Statistics](#statistics)
* [Overview of Issues](#overview-of-issues)<% overviewOfIssues.forEach(o => { %>
    * [<%= o.title %>](#<%= o.label %>)<% }) %>
* [Vulnerabilities](#vulnerabilities)<% Object.entries(functions.groupToObjectBy(issues, 'severity')).forEach(([severity, issues]) => { %>
    * [<%= functions.capitalise(severity) %> (<%= issues.length %>)](#<%= severity %>-severity)<% }) %>
* [Additional Information](#additional-information)
    * [What are severity levels?](#what-are-severity-levels)

# Overview of Issues
<% overviewOfIssues.forEach(o => { %>
<a id="<%= o.label %>"></a>
## <%= o.title %>

<% if (o.description) { %><%= o.description %>
<% } %>
<% if (o.dataSourceSpecific.cwe.background) { %><%= o.dataSourceSpecific.cwe.background %>
<% } %>
<% if (o.dataSourceSpecific.cwe.extendedDescription) { %><%= o.dataSourceSpecific.cwe.extendedDescription %>
<% } %>

<% if (o.dataSourceSpecific.cwe.consequences.length) { %>### Consequences

Using a vulnerability of this type an attacker may be able to affect the system in the following ways.
<% o.dataSourceSpecific.cwe.consequences.forEach(c => { %>
<% c.scopeImpacts.forEach(si => { %>* **<%= si.scope %>**<% if (si.impact) { %>: <%= si.impact %><% } %>
<% }) %><% if (c.likelihood) { %>
**Likelihood** <%= c.likelihood %><% } %><% if (c.note) { %>
> <%= c.note %><% } %>
<% }) %><% } %>

For more information see [<%= o.label %>](<%= o.directLink %>).
<% }) %>

# Vulnerabilities

<% Object.entries(functions.groupToObjectBy(issues, 'severity')).forEach(([severity, issues]) => { %>## <%= functions.capitalise(severity) %> Severity

<% issues.forEach(issue => { %>### <%= issue.title %> <% if (issue.package) { %>(version <%= issue.package.version %>)<% } %>

**Severity**: [<%= functions.capitalise(issue.severity) %>](#<%= issue.severity %>) | **Type**: <%= issue.type %> | **Fix**: <%= issue.fix %> | **Found By**: [<%= issue.foundBy %>](https://www.npmjs.com/package/<%= issue.foundBy %>)

<%= issue.description || issue.references?.[0]?.description %>

<% if (issue.extracts?.length > 0 || issue.requests?.length > 0) { %>#### Evidence

The following evidence of this vulnerability was found in the application.
<% issue.extracts?.forEach(extract => { %>
`<%= extract.path %>` (starting on line: <%= extract.lines[0] %>)
```<%= extract.language %>
<%= extract.code %>
```
<% }) %>
<% issue.requests?.slice(0, 4).forEach((r, i) => { %>

<details><summary><strong>Example "Web Request <%= i + 1 %>"</strong></summary>

* **Request**
    * **Target**: `<%= r.request.target %>`
    * **Method**: `<%= r.request.method %>`
    * **Headers**:
      ```json
<%= JSON.stringify(r.request.headers, null, 2).split('\n').map(l => `      ${l}`).join('\n') %>
      ```<% if (r.request.body) { %>
    * **Body**:
      ```json
<%= JSON.stringify(r.request.body, null, 2).split('\n').map(l => `      ${l}`).join('\n') %>
      ```<% } %>
    * **Curl**:
      ```shell
      curl -o - -i \
        -X <%= r.request.method %> \<% if (r.request.body) { %>
        --data '<%= r.request.body %>' \<% } %><% if (r.request.headers) { %>
        <%= Object.entries(r.request.headers).filter(([name, value]) => name !== 'content-length').map(([name, value]) => `-H "${name}: ${value}" \\`).join('\n            ') %><% } %>
        "<%= r.request.target %>"
      ```
* **Response**
    * **Status Code**: `<%= r.response.statusCode %>`
    * **Headers**:
      ```json
<%= JSON.stringify(r.response.headers, null, 2).split('\n').map(l => `      ${l}`).join('\n') %>
      ```
<% if (r.response.body) { %>    * **Body**:
      ```<%= r.response.body.indexOf('<!doctype html>') !== -1 ? 'html' : 'json' %>
<%= r.response.body?.split('\n').map(l => `      ${l}`).join('\n') %>
      ```<% } %>

</details>

<% }) %><% } %>
<% if (issue.references?.length > 0) { %>##### References

<%= issue.references?.map(r => r.label.startsWith('CWE') ? `[${r.label}](#${r.label})` : `[${r.label}](${r.directLink})`).join(' | ') %>

<% } %><% }) %><% }) %>

# Additional Information

## What are severity levels?

Issue severity is scored using the [Common Vulnerability Scoring System](https://www.first.org/cvss/) (CVSS) where
such data is available. Severity levels do not represent the risk associated with an issue as risk depends on your
specific context. Severity scoring does however give an indication of the ease of exploitation and potential scope of an
attacks effect on an application.

### Critical

Exploitation will likely lead to an attacker gaining administrative access to the application and infrastructure that
supports it. Exploiting critical vulnerabilities is usually trivial and will generally not require prior access to the
application. **A development team should aim to resolve these issues immediately by mitigating or directly resolving the
issue**.

### High

Exploitation could lead to an attacker gaining elevated access to the application and the infrastructure that supports
it. It is likely that an attacker will not find exploitation trivial. Such exploitation could lead to significant data
loss or downtime.

### Medium

Exploitation could lead to an attacker gaining limited access to the application. Exploiting vulnerabilities may require
an attacker to manipulate users to gain access to their credentials. Such exploitation could lead to limited data loss
or downtime.

### Low

Exploitation will likely have very little impact on the application, and it is unlikely that an attacker will gain any
meaningful access to the application. Exploiting an issue of this severity will potentially require physical access to
the infrastructure that supports the application.

### Informational

While not part of the CVSS scoring specification, several security analysis tools use this severity level to indicate
that an issue is a matter of best practice. It is extremely unlikely that issues with this severity will lead to an
attacker gaining access to any application components.

### Unknown

This severity level is used when the analysis tool used to perform a scan of the application does not associate any kind
of severity level with the issues or vulnerabilities it finds. Issues with an unknown severity should be investigated by
application developers and project stakeholders to establish the ease of exploitation, scope of any potential impact and
the specific risks associated.
