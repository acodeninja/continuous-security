---
hide:
  - navigation
---

# Example Report

This example report was generated against the [javascript](https://github.com/acodeninja/ere-be-dragons/blob/main/codebases/javascript/README.md)
codebase which is part of the [ere-be-dragons](https://github.com/acodeninja/ere-be-dragons/) 
repository.

## Summary

This security report was conducted on 27/07/2023 at 12:53:18 (UTC+1).
A total of 16 issue(s) were found, 0 of which may require immediate attention.

The following technical impacts may arise if an adversary successfully exploits one of the issues found by this scan.

* **Confidentiality**: Read Application Data, Execute Unauthorized Code or Commands, Gain Privileges or Assume Identity
* **Access Control**: Bypass Protection Mechanism, Gain Privileges or Assume Identity, DoS: Crash, Exit, or Restart
* **Integrity**: Execute Unauthorized Code or Commands, Bypass Protection Mechanism, Modify Application Data
* **Availability**: Read Application Data
* **Accountability**: Hide Activities
* **Non-Repudiation**: Modify Application Data

### Contents

* [Issue Statistics](#statistics)
* [Overview of Issues](#overview-of-issues)
* [Vulnerabilities](#vulnerabilities)
* [Additional Information](#additional-information)
  * [What are severity levels?](#what-are-severity-levels)

## Statistics

This report found issues with the following severities.

**Critical**: 0 | **High** 4 | **Medium** 6 | **Low** 2 | **Informational** 1 | **Unknown** 3

To gain a better understanding of the severity levels please see [the appendix](#what-are-severity-levels).

## Overview of Issues

<a id="CWE-79"></a>
### Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')

The product does not neutralize or incorrectly neutralizes user-controllable input before it is placed in output that is used as a web page that is served to other users.

The Same Origin Policy states that browsers should limit the resources accessible to scripts running on a given web site, or "origin", to the resources associated with that web site on the client-side, and not the client-side resources of any other sites or "origins". The goal is to prevent one site from being able to modify or read the contents of an unrelated site. Since the World Wide Web involves interactions between many sites, this policy is important for browsers to enforce.When referring to XSS, the Domain of a website is roughly equivalent to the resources associated with that website on the client-side of the connection. That is, the domain can be thought of as all resources the browser is storing for the user's interactions with this particular site.

Cross-site scripting (XSS) vulnerabilities occur when:Untrusted data enters a web application, typically from a web request.The web application dynamically generates a web page that contains this untrusted data.During page generation, the application does not prevent the data from containing content that is executable by a web browser, such as JavaScript, HTML tags, HTML attributes, mouse events, Flash, ActiveX, etc.A victim visits the generated web page through a web browser, which contains malicious script that was injected using the untrusted data.Since the script comes from a web page that was sent by the web server, the victim's web browser executes the malicious script in the context of the web server's domain.This effectively violates the intention of the web browser's same-origin policy, which states that scripts in one domain should not be able to access resources or run code in a different domain.There are three main kinds of XSS:Type 1: Reflected XSS (or Non-Persistent) - The server reads data directly from the HTTP request and reflects it back in the HTTP response. Reflected XSS exploits occur when an attacker causes a victim to supply dangerous content to a vulnerable web application, which is then reflected back to the victim and executed by the web browser. The most common mechanism for delivering malicious content is to include it as a parameter in a URL that is posted publicly or e-mailed directly to the victim. URLs constructed in this manner constitute the core of many phishing schemes, whereby an attacker convinces a victim to visit a URL that refers to a vulnerable site. After the site reflects the attacker's content back to the victim, the content is executed by the victim's browser.Type 2: Stored XSS (or Persistent) - The application stores dangerous data in a database, message forum, visitor log, or other trusted data store. At a later time, the dangerous data is subsequently read back into the application and included in dynamic content. From an attacker's perspective, the optimal place to inject malicious content is in an area that is displayed to either many users or particularly interesting users. Interesting users typically have elevated privileges in the application or interact with sensitive data that is valuable to the attacker. If one of these users executes malicious content, the attacker may be able to perform privileged operations on behalf of the user or gain access to sensitive data belonging to the user. For example, the attacker might inject XSS into a log message, which might not be handled properly when an administrator views the logs. Type 0: DOM-Based XSS - In DOM-based XSS, the client performs the injection of XSS into the page; in the other types, the server performs the injection. DOM-based XSS generally involves server-controlled, trusted script that is sent to the client, such as Javascript that performs sanity checks on a form before the user submits it. If the server-supplied script processes user-supplied data and then injects it back into the web page (such as with dynamic HTML), then DOM-based XSS is possible. Once the malicious script is injected, the attacker can perform a variety of malicious activities. The attacker could transfer private information, such as cookies that may include session information, from the victim's machine to the attacker. The attacker could send malicious requests to a web site on behalf of the victim, which could be especially dangerous to the site if the victim has administrator privileges to manage that site. Phishing attacks could be used to emulate trusted web sites and trick the victim into entering a password, allowing the attacker to compromise the victim's account on that web site. Finally, the script could exploit a vulnerability in the web browser itself possibly taking over the victim's machine, sometimes referred to as "drive-by hacking."In many cases, the attack can be launched without the victim even being aware of it. Even with careful users, attackers frequently use a variety of methods to encode the malicious portion of the attack, such as URL encoding or Unicode, so the request looks less suspicious.


#### Consequences

Using a vulnerability of this type an attacker may be able to affect the system in the following ways. 

* **Access Control**: Bypass Protection Mechanism
* **Confidentiality**: Read Application Data

> The most common attack performed with cross-site scripting involves the disclosure of information stored in user cookies. Typically, a malicious user will craft a client-side script, which -- when parsed by a web browser -- performs some activity (such as sending all site cookies to a given E-mail address). This script will be loaded and run by each user visiting the web site. Since the site requesting to run the script has access to the cookies in question, the malicious script does also.

* **Integrity**: Execute Unauthorized Code or Commands
* **Confidentiality**
* **Availability**

> In some circumstances it may be possible to run arbitrary code on a victim's computer when cross-site scripting is combined with other flaws.

* **Confidentiality**: Execute Unauthorized Code or Commands
* **Integrity**: Bypass Protection Mechanism
* **Availability**: Read Application Data
* **Access Control**

> The consequence of an XSS attack is the same regardless of whether it is stored or reflected. The difference is in how the payload arrives at the server. XSS can cause a variety of problems for the end user that range in severity from an annoyance to complete account compromise. Some cross-site scripting vulnerabilities can be exploited to manipulate or steal cookies, create requests that can be mistaken for those of a valid user, compromise confidential information, or execute malicious code on the end user systems for a variety of nefarious purposes. Other damaging attacks include the disclosure of end user files, installation of Trojan horse programs, redirecting the user to some other page or site, running "Active X" controls (under Microsoft Internet Explorer) from sites that a user perceives as trustworthy, and modifying presentation of content.


For more information see [CWE-79](https://cwe.mitre.org/data/definitions/79.html).

<a id="CWE-200"></a>
### Exposure of Sensitive Information to an Unauthorized Actor

The product exposes sensitive information to an actor that is not explicitly authorized to have access to that information.


There are many different kinds of mistakes that introduce information exposures. The severity of the error can range widely, depending on the context in which the product operates, the type of sensitive information that is revealed, and the benefits it may provide to an attacker. Some kinds of sensitive information include:private, personal information, such as personal messages, financial data, health records, geographic location, or contact detailssystem status and environment, such as the operating system and installed packagesbusiness secrets and intellectual propertynetwork status and configurationthe product's own code or internal statemetadata, e.g. logging of connections or message headersindirect information, such as a discrepancy between two internal operations that can be observed by an outsiderInformation might be sensitive to different parties, each of which may have their own expectations for whether the information should be protected. These parties include:the product's own userspeople or organizations whose information is created or used by the product, even if they are not direct product usersthe product's administrators, including the admins of the system(s) and/or networks on which the product operatesthe developerInformation exposures can occur in different ways:the code explicitly inserts sensitive information into resources or messages that are intentionally made accessible to unauthorized actors, but should not contain the information - i.e., the information should have been "scrubbed" or "sanitized"a different weakness or mistake indirectly inserts the sensitive information into resources, such as a web script error revealing the full system path of the program.the code manages resources that intentionally contain sensitive information, but the resources are unintentionally made accessible to unauthorized actors. In this case, the information exposure is resultant - i.e., a different weakness enabled the access to the information in the first place.It is common practice to describe any loss of confidentiality as an "information exposure," but this can lead to overuse of [CWE-200](https://cwe.mitre.org/data/definitions/200.html) in CWE mapping. From the CWE perspective, loss of confidentiality is a technical impact that can arise from dozens of different weaknesses, such as insecure file permissions or out-of-bounds read. [CWE-200](https://cwe.mitre.org/data/definitions/200.html) and its lower-level descendants are intended to cover the mistakes that occur in behaviors that explicitly manage, store, transfer, or cleanse sensitive information.


#### Consequences

Using a vulnerability of this type an attacker may be able to affect the system in the following ways. 

* **Confidentiality**: Read Application Data



For more information see [CWE-200](https://cwe.mitre.org/data/definitions/200.html).

<a id="CWE-327"></a>
### Use of a Broken or Risky Cryptographic Algorithm

The product uses a broken or risky cryptographic algorithm or protocol.


Cryptographic algorithms are the methods by which data is scrambled to prevent observation or influence by unauthorized actors. Insecure cryptography can be exploited to expose sensitive information, modify data in unexpected ways, spoof identities of other users or devices, or other impacts.It is very difficult to produce a secure algorithm, and even high-profile algorithms by accomplished cryptographic experts have been broken. Well-known techniques exist to break or weaken various kinds of cryptography. Accordingly, there are a small number of well-understood and heavily studied algorithms that should be used by most products. Using a non-standard or known-insecure algorithm is dangerous because a determined adversary may be able to break the algorithm and compromise whatever data has been protected.Since the state of cryptography advances so rapidly, it is common for an algorithm to be considered "unsafe" even if it was once thought to be strong. This can happen when new attacks are discovered, or if computing power increases so much that the cryptographic algorithm no longer provides the amount of protection that was originally thought.For a number of reasons, this weakness is even more challenging to manage with hardware deployment of cryptographic algorithms as opposed to software implementation. First, if a flaw is discovered with hardware-implemented cryptography, the flaw cannot be fixed in most cases without a recall of the product, because hardware is not easily replaceable like software. Second, because the hardware product is expected to work for years, the adversary's computing power will only increase over time.


#### Consequences

Using a vulnerability of this type an attacker may be able to affect the system in the following ways. 

* **Confidentiality**: Read Application Data

> The confidentiality of sensitive data may be compromised by the use of a broken or risky cryptographic algorithm.

* **Integrity**: Modify Application Data

> The integrity of sensitive data may be compromised by the use of a broken or risky cryptographic algorithm.

* **Accountability**: Hide Activities
* **Non-Repudiation**

> If the cryptographic algorithm is used to ensure the identity of the source of the data (such as digital signatures), then a broken algorithm will compromise this scheme and the source of the data cannot be proven.


For more information see [CWE-327](https://cwe.mitre.org/data/definitions/327.html).

<a id="CWE-352"></a>
### Cross-Site Request Forgery (CSRF)

The web application does not, or can not, sufficiently verify whether a well-formed, valid, consistent request was intentionally provided by the user who submitted the request.


When a web server is designed to receive a request from a client without any mechanism for verifying that it was intentionally sent, then it might be possible for an attacker to trick a client into making an unintentional request to the web server which will be treated as an authentic request. This can be done via a URL, image load, XMLHttpRequest, etc. and can result in exposure of data or unintended code execution.


#### Consequences

Using a vulnerability of this type an attacker may be able to affect the system in the following ways. 

* **Confidentiality**: Gain Privileges or Assume Identity
* **Integrity**: Bypass Protection Mechanism
* **Availability**: Read Application Data
* **Non-Repudiation**: Modify Application Data
* **Access Control**: DoS: Crash, Exit, or Restart

> The consequences will vary depending on the nature of the functionality that is vulnerable to CSRF. An attacker could effectively perform any operations as the victim. If the victim is an administrator or privileged user, the consequences may include obtaining complete control over the web application - deleting or stealing data, uninstalling the product, or using it to launch other attacks against all of the product's users. Because the attacker has the identity of the victim, the scope of CSRF is limited only by the victim's privileges.


For more information see [CWE-352](https://cwe.mitre.org/data/definitions/352.html).

<a id="CWE-693"></a>
### Protection Mechanism Failure

The product does not use or incorrectly uses a protection mechanism that provides sufficient defense against directed attacks against the product.


This weakness covers three distinct situations. A "missing" protection mechanism occurs when the application does not define any mechanism against a certain class of attack. An "insufficient" protection mechanism might provide some defenses - for example, against the most common attacks - but it does not protect against everything that is intended. Finally, an "ignored" mechanism occurs when a mechanism is available and in active use within the product, but the developer has not applied it in some code path.


#### Consequences

Using a vulnerability of this type an attacker may be able to affect the system in the following ways. 

* **Access Control**: Bypass Protection Mechanism



For more information see [CWE-693](https://cwe.mitre.org/data/definitions/693.html).

<a id="CWE-1021"></a>
### Improper Restriction of Rendered UI Layers or Frames

The web application does not restrict or incorrectly restricts frame objects or UI layers that belong to another application or domain, which can lead to user confusion about which interface the user is interacting with.


A web application is expected to place restrictions on whether it is allowed to be rendered within frames, iframes, objects, embed or applet elements. Without the restrictions, users can be tricked into interacting with the application when they were not intending to.


#### Consequences

Using a vulnerability of this type an attacker may be able to affect the system in the following ways. 

* **Access Control**: Gain Privileges or Assume Identity

> An attacker can trick a user into performing actions that are masked and hidden from the user's view. The impact varies widely, depending on the functionality of the underlying application. For example, in a social media application, clickjacking could be used to trik the user into changing privacy settings.


For more information see [CWE-1021](https://cwe.mitre.org/data/definitions/1021.html).


## Vulnerabilities

### High Severity

#### Vulnerable Third-Party Library `squirrelly` (version )

**Severity**: [High](#High) | **Type**: dependency | **Fix**: Upgrade to version above <=8.0.8 | **Found By**: [@continuous-security/scanner-javascript-npm-audit](https://www.npmjs.com/package/@continuous-security/scanner-javascript-npm-audit)

Insecure template handling in Squirrelly


##### References

[CVE-2021-32819](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32819) | [CWE-200](#CWE-200) | [GHSA-q8j6-pwqx-pm96](https://osv.dev/vulnerability/GHSA-q8j6-pwqx-pm96)

#### Cross Site Scripting (Reflected) 

**Severity**: [High](#High) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user's browser instance. A browser instance can be a standard web browser client, or a browser object embedded in a software product such as the browser within WinAmp, an RSS reader, or an email client. The code itself is usually written in HTML/JavaScript, but may also extend to VBScript, ActiveX, Java, Flash, or any other browser-supported technology.
When an attacker gets a user's browser to execute his/they code, the code will run within the security context (or zone) of the hosting web site. With this level of privilege, the code has the ability to read, modify and transmit any sensitive data accessible by the browser. A Cross-site Scripted user could have his/they account hijacked (cookie theft), their browser redirected to another location, or possibly shown fraudulent content delivered by the web site they are visiting. Cross-site Scripting attacks essentially compromise the trust relationship between a user and the web site. Applications utilizing browser object instances which load content from the file system may execute code under the local machine zone allowing for system compromise.

There are three types of Cross-site Scripting attacks: non-persistent, persistent and DOM-based.
Non-persistent attacks and DOM-based attacks require a user to either visit a specially crafted link laced with malicious code, or visit a malicious web page containing a web form, which when posted to the vulnerable site, will mount the attack. Using a malicious form will oftentimes take place when the vulnerable resource only accepts HTTP POST requests. In such a case, the form can be submitted automatically, without the victim's knowledge (e.g. by using JavaScript). Upon clicking on the malicious link or submitting the malicious form, the XSS payload will get echoed back and will get interpreted by the user's browser and execute. Another technique to send almost arbitrary requests (GET and POST) is by using an embedded client, such as Adobe Flash.
Persistent attacks occur when the malicious code is submitted to a web site where it's stored for a period of time. Examples of an attacker's favorite targets often include message board posts, web mail messages, and web chat software. The unsuspecting user is not required to interact with any additional site/link (e.g. an attacker site or a malicious link sent via email), just simply view the web page containing the code.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000/search?q=%3C%2Fp%3E%3CscrIpt%3Ealert%281%29%3B%3C%2FscRipt%3E%3Cp%3E`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000/search",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000/search" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search?q=%3C%2Fp%3E%3CscrIpt%3Ealert%281%29%3B%3C%2FscRipt%3E%3Cp%3E"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "280",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:42 GMT",
        "ETag": "W/\"118-/mfVi9YUanYMkHNSOl6jJp6Hx7o\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: </p><scrIpt>alert(1);</scRipt><p></p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 2</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "67",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Body**:
      ```json
      "words=%3C%2Fli%3E%3CscrIpt%3Ealert%281%29%3B%3C%2FscRipt%3E%3Cli%3E"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=%3C%2Fli%3E%3CscrIpt%3Ealert%281%29%3B%3C%2FscRipt%3E%3Cli%3E' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "334",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:42 GMT",
        "ETag": "W/\"14e-D3XeMREQwf0AfHccKwRngOLPcQc\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li></li><scrIpt>alert(1);</scRipt><li></li></ul>
      </body>
      </html>
      
      ```

</details>

##### References

[CWE-79](#CWE-79)

#### Cross Site Scripting (Persistent) 

**Severity**: [High](#High) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user's browser instance. A browser instance can be a standard web browser client, or a browser object embedded in a software product such as the browser within WinAmp, an RSS reader, or an email client. The code itself is usually written in HTML/JavaScript, but may also extend to VBScript, ActiveX, Java, Flash, or any other browser-supported technology.
When an attacker gets a user's browser to execute his/they code, the code will run within the security context (or zone) of the hosting web site. With this level of privilege, the code has the ability to read, modify and transmit any sensitive data accessible by the browser. A Cross-site Scripted user could have his/they account hijacked (cookie theft), their browser redirected to another location, or possibly shown fraudulent content delivered by the web site they are visiting. Cross-site Scripting attacks essentially compromise the trust relationship between a user and the web site. Applications utilizing browser object instances which load content from the file system may execute code under the local machine zone allowing for system compromise.

There are three types of Cross-site Scripting attacks: non-persistent, persistent and DOM-based.
Non-persistent attacks and DOM-based attacks require a user to either visit a specially crafted link laced with malicious code, or visit a malicious web page containing a web form, which when posted to the vulnerable site, will mount the attack. Using a malicious form will oftentimes take place when the vulnerable resource only accepts HTTP POST requests. In such a case, the form can be submitted automatically, without the victim's knowledge (e.g. by using JavaScript). Upon clicking on the malicious link or submitting the malicious form, the XSS payload will get echoed back and will get interpreted by the user's browser and execute. Another technique to send almost arbitrary requests (GET and POST) is by using an embedded client, such as Adobe Flash.
Persistent attacks occur when the malicious code is submitted to a web site where it's stored for a period of time. Examples of an attacker's favorite targets often include message board posts, web mail messages, and web chat software. The unsuspecting user is not required to interact with any additional site/link (e.g. an attacker site or a malicious link sent via email), just simply view the web page containing the code.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "354",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:42 GMT",
        "ETag": "W/\"162-NTVvLZWqAQaEUdiy1lVF34BZokk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li><img src=x onerror=alert(1);></li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

##### References

[CWE-79](#CWE-79)

#### Cross Site Scripting (DOM Based) 

**Severity**: [High](#High) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user's browser instance. A browser instance can be a standard web browser client, or a browser object embedded in a software product such as the browser within WinAmp, an RSS reader, or an email client. The code itself is usually written in HTML/JavaScript, but may also extend to VBScript, ActiveX, Java, Flash, or any other browser-supported technology.
When an attacker gets a user's browser to execute his/they code, the code will run within the security context (or zone) of the hosting web site. With this level of privilege, the code has the ability to read, modify and transmit any sensitive data accessible by the browser. A Cross-site Scripted user could have his/they account hijacked (cookie theft), their browser redirected to another location, or possibly shown fraudulent content delivered by the web site they are visiting. Cross-site Scripting attacks essentially compromise the trust relationship between a user and the web site. Applications utilizing browser object instances which load content from the file system may execute code under the local machine zone allowing for system compromise.

There are three types of Cross-site Scripting attacks: non-persistent, persistent and DOM-based.
Non-persistent attacks and DOM-based attacks require a user to either visit a specially crafted link laced with malicious code, or visit a malicious web page containing a web form, which when posted to the vulnerable site, will mount the attack. Using a malicious form will oftentimes take place when the vulnerable resource only accepts HTTP POST requests. In such a case, the form can be submitted automatically, without the victim's knowledge (e.g. by using JavaScript). Upon clicking on the malicious link or submitting the malicious form, the XSS payload will get echoed back and will get interpreted by the user's browser and execute. Another technique to send almost arbitrary requests (GET and POST) is by using an embedded client, such as Adobe Flash.
Persistent attacks occur when the malicious code is submitted to a web site where it's stored for a period of time. Examples of an attacker's favorite targets often include message board posts, web mail messages, and web chat software. The unsuspecting user is not required to interact with any additional site/link (e.g. an attacker site or a malicious link sent via email), just simply view the web page containing the code.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `0`
    * **Headers**:
      ```json
      {}
      ```


</details>

<details markdown><summary>Example 2</summary>

* **Request**
    * **Target**: `http://localhost:3000/search`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search"
      ```
* **Response**
    * **Status Code**: `0`
    * **Headers**:
      ```json
      {}
      ```


</details>

<details markdown><summary>Example 3</summary>

* **Request**
    * **Target**: `http://localhost:3000/search?q=ZAP`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000/search",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000/search" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search?q=ZAP"
      ```
* **Response**
    * **Status Code**: `0`
    * **Headers**:
      ```json
      {}
      ```


</details>

<details markdown><summary>Example 4</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `0`
    * **Headers**:
      ```json
      {}
      ```


</details>

##### References

[CWE-79](#CWE-79)

### Moderate Severity

#### Unsafe Import 

**Severity**: [Moderate](#Moderate) | **Type**: code smell | **Fix**: unknown | **Found By**: [@continuous-security/scanner-javascript-js-x-ray](https://www.npmjs.com/package/@continuous-security/scanner-javascript-js-x-ray)

Unable to follow an import (require, require.resolve) statement/expr.

##### Evidence

The following examples were found in the application.

`app.js` (starting on line: 8)
```javascript
 6| try {
 7|   const mod = `test-${Date.now()}`;
 8|   require(mod);
 9| } catch (e) {
10| 
```


#### Unsafe Regex 

**Severity**: [Moderate](#Moderate) | **Type**: code smell | **Fix**: unknown | **Found By**: [@continuous-security/scanner-javascript-js-x-ray](https://www.npmjs.com/package/@continuous-security/scanner-javascript-js-x-ray)

A RegEx as been detected as unsafe and may be used for a ReDoS Attack.

##### Evidence

The following examples were found in the application.

`app.js` (starting on line: 65)
```javascript
63| app.all('/', (req, res) => {
64|   if (req.body["words"]) formInputs.push(req.body["words"]);
65|   if (req.body["words"]?.match(/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\${)[^\\`])*`/g))
66|     logger.info('Regex match failed');
67| 
```


#### Missing Anti-clickjacking Header 

**Severity**: [Moderate](#Moderate) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

The response does not include either Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options to protect against 'ClickJacking' attacks.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "328",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"148-/8QAzpPyggx0cBPRchpZREH8Sh0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 2</summary>

* **Request**
    * **Target**: `http://localhost:3000/search`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "256",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"100-0IVFNYeF53+7WmCUr5QjU3oVSNo\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: undefined</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 3</summary>

* **Request**
    * **Target**: `http://localhost:3000/search?q=ZAP`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000/search",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000/search" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search?q=ZAP"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "250",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"fa-m0C4nr+4DpUydHIyqIl5P/Q4fSI\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: ZAP</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 4</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "341",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"155-/kFaXjAZaA6jdrLENLIwRlY0nmk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

##### References

[CWE-1021](#CWE-1021)

#### Content Security Policy (CSP) Header Not Set 

**Severity**: [Moderate](#Moderate) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "328",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"148-/8QAzpPyggx0cBPRchpZREH8Sh0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 2</summary>

* **Request**
    * **Target**: `http://localhost:3000/search`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "256",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"100-0IVFNYeF53+7WmCUr5QjU3oVSNo\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: undefined</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 3</summary>

* **Request**
    * **Target**: `http://localhost:3000/search?q=ZAP`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000/search",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000/search" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search?q=ZAP"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "250",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"fa-m0C4nr+4DpUydHIyqIl5P/Q4fSI\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: ZAP</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 4</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "341",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"155-/kFaXjAZaA6jdrLENLIwRlY0nmk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

##### References

[CWE-693](#CWE-693)

#### CSP: Wildcard Directive 

**Severity**: [Moderate](#Moderate) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks. Including (but not limited to) Cross Site Scripting (XSS), and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000/robots.txt`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/robots.txt"
      ```
* **Response**
    * **Status Code**: `404`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "149",
        "Content-Security-Policy": "default-src 'none'",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "Keep-Alive": "timeout=5",
        "X-Content-Type-Options": "nosniff",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```json
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="utf-8">
      <title>Error</title>
      </head>
      <body>
      <pre>Cannot GET /robots.txt</pre>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 2</summary>

* **Request**
    * **Target**: `http://localhost:3000/sitemap.xml`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/sitemap.xml"
      ```
* **Response**
    * **Status Code**: `404`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "150",
        "Content-Security-Policy": "default-src 'none'",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "Keep-Alive": "timeout=5",
        "X-Content-Type-Options": "nosniff",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```json
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="utf-8">
      <title>Error</title>
      </head>
      <body>
      <pre>Cannot GET /sitemap.xml</pre>
      </body>
      </html>
      
      ```

</details>

##### References

[CWE-693](#CWE-693)

#### Absence of Anti-CSRF Tokens 

**Severity**: [Moderate](#Moderate) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

No Anti-CSRF tokens were found in a HTML submission form.
A cross-site request forgery is an attack that involves forcing a victim to send an HTTP request to a target destination without their knowledge or intent in order to perform an action as the victim. The underlying cause is application functionality using predictable URL/form actions in a repeatable way. The nature of the attack is that CSRF exploits the trust that a web site has for a user. By contrast, cross-site scripting (XSS) exploits the trust that a user has for a web site. Like XSS, CSRF attacks are not necessarily cross-site, but they can be. Cross-site request forgery is also known as CSRF, XSRF, one-click attack, session riding, confused deputy, and sea surf.

CSRF attacks are effective in a number of situations, including:
    * The victim has an active session on the target site.
    * The victim is authenticated via HTTP auth on the target site.
    * The victim is on the same local network as the target site.

CSRF has primarily been used to perform an action against a target site using the victim's privileges, but recent techniques have been discovered to disclose information by gaining access to the response. The risk of information disclosure is dramatically increased when the target site is vulnerable to XSS, because XSS can be used as a platform for CSRF, allowing the attack to operate within the bounds of the same-origin policy.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "328",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"148-/8QAzpPyggx0cBPRchpZREH8Sh0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 2</summary>

* **Request**
    * **Target**: `http://localhost:3000/search`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "256",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"100-0IVFNYeF53+7WmCUr5QjU3oVSNo\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: undefined</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 3</summary>

* **Request**
    * **Target**: `http://localhost:3000/search?q=ZAP`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000/search",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000/search" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search?q=ZAP"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "250",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"fa-m0C4nr+4DpUydHIyqIl5P/Q4fSI\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: ZAP</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 4</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "341",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"155-/kFaXjAZaA6jdrLENLIwRlY0nmk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

##### References

[CWE-352](#CWE-352)

### Low Severity

#### X-Content-Type-Options Header Missing 

**Severity**: [Low](#Low) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "328",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"148-/8QAzpPyggx0cBPRchpZREH8Sh0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 2</summary>

* **Request**
    * **Target**: `http://localhost:3000/search`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "256",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"100-0IVFNYeF53+7WmCUr5QjU3oVSNo\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: undefined</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 3</summary>

* **Request**
    * **Target**: `http://localhost:3000/search?q=ZAP`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000/search",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000/search" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search?q=ZAP"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "250",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"fa-m0C4nr+4DpUydHIyqIl5P/Q4fSI\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: ZAP</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 4</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "341",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"155-/kFaXjAZaA6jdrLENLIwRlY0nmk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

##### References

[CWE-693](#CWE-693)

#### Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s) 

**Severity**: [Low](#Low) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

The web/application server is leaking information via one or more "X-Powered-By" HTTP response headers. Access to such information may facilitate attackers identifying other frameworks/components your web application is reliant upon and the vulnerabilities such components may be subject to.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "328",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"148-/8QAzpPyggx0cBPRchpZREH8Sh0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 2</summary>

* **Request**
    * **Target**: `http://localhost:3000/robots.txt`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/robots.txt"
      ```
* **Response**
    * **Status Code**: `404`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "149",
        "Content-Security-Policy": "default-src 'none'",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "Keep-Alive": "timeout=5",
        "X-Content-Type-Options": "nosniff",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```json
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="utf-8">
      <title>Error</title>
      </head>
      <body>
      <pre>Cannot GET /robots.txt</pre>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 3</summary>

* **Request**
    * **Target**: `http://localhost:3000/search`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "256",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"100-0IVFNYeF53+7WmCUr5QjU3oVSNo\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: undefined</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 4</summary>

* **Request**
    * **Target**: `http://localhost:3000/search?q=ZAP`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000/search",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000/search" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/search?q=ZAP"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "250",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"fa-m0C4nr+4DpUydHIyqIl5P/Q4fSI\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <form action="/search">
        <label for="q">Search</label>
        <input name="q" id="q" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <p>You searched for: ZAP</p>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 5</summary>

* **Request**
    * **Target**: `http://localhost:3000/sitemap.xml`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/sitemap.xml"
      ```
* **Response**
    * **Status Code**: `404`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "150",
        "Content-Security-Policy": "default-src 'none'",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "Keep-Alive": "timeout=5",
        "X-Content-Type-Options": "nosniff",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```json
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="utf-8">
      <title>Error</title>
      </head>
      <body>
      <pre>Cannot GET /sitemap.xml</pre>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 6</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "341",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:41 GMT",
        "ETag": "W/\"155-/kFaXjAZaA6jdrLENLIwRlY0nmk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

##### References

[CWE-200](#CWE-200)

### Info Severity

#### User Agent Fuzzer 

**Severity**: [Info](#Info) | **Type**: web request | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-zed-attack-proxy](https://www.npmjs.com/package/@continuous-security/scanner-zed-attack-proxy)

Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.

##### Evidence

The following examples were found in the application.


<details markdown><summary>Example 1</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "315",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"13b-/S2Y9oQJCdLORuOVL3mRHXLZue0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 2</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "302",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"12e-KOzWPVFFMMAcJppYazEO/rtl+yk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 3</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "341",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"155-/kFaXjAZaA6jdrLENLIwRlY0nmk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 4</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "354",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"162-NGZgsw8SFApDvNj/35/jwZ+E6Uk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 5</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "302",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"12e-KOzWPVFFMMAcJppYazEO/rtl+yk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 6</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "315",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"13b-/S2Y9oQJCdLORuOVL3mRHXLZue0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 7</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "302",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"12e-KOzWPVFFMMAcJppYazEO/rtl+yk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 8</summary>

* **Request**
    * **Target**: `http://localhost:3000`
    * **Method**: `GET`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "user-agent": "msnbot/1.1 (+http://search.msn.com/msnbot.htm)"
      }
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X GET \
        -H "cache-control: no-cache" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "user-agent: msnbot/1.1 (+http://search.msn.com/msnbot.htm)" \
        "http://localhost:3000"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "354",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"162-NGZgsw8SFApDvNj/35/jwZ+E6Uk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 9</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "328",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"148-/8QAzpPyggx0cBPRchpZREH8Sh0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 10</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "315",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"13b-/S2Y9oQJCdLORuOVL3mRHXLZue0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 11</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "302",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"12e-KOzWPVFFMMAcJppYazEO/rtl+yk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 12</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3739.0 Safari/537.36 Edg/75.0.109.0" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "354",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"162-NGZgsw8SFApDvNj/35/jwZ+E6Uk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 13</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "367",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"16f-i7yrGH6GzYLketjm0f1cTNKQTNE\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 14</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/91.0" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "354",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"162-NGZgsw8SFApDvNj/35/jwZ+E6Uk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 15</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "367",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"16f-i7yrGH6GzYLketjm0f1cTNKQTNE\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 16</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "315",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"13b-/S2Y9oQJCdLORuOVL3mRHXLZue0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 17</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "328",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"148-/8QAzpPyggx0cBPRchpZREH8Sh0\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li>
      <li>ZAP</li>
      <li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

<details markdown><summary>Example 18</summary>

* **Request**
    * **Target**: `http://localhost:3000/`
    * **Method**: `POST`
    * **Headers**:
      ```json
      {
        "cache-control": "no-cache",
        "content-length": "9",
        "content-type": "application/x-www-form-urlencoded",
        "host": "localhost:3000",
        "pragma": "no-cache",
        "referer": "http://localhost:3000",
        "user-agent": "msnbot/1.1 (+http://search.msn.com/msnbot.htm)"
      }
      ```
    * **Body**:
      ```json
      "words=ZAP"
      ```
    * **Curl**:
      ```shell
      curl -o - -i \
        -X POST \
        --data 'words=ZAP' \
        -H "cache-control: no-cache" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "host: localhost:3000" \
        -H "pragma: no-cache" \
        -H "referer: http://localhost:3000" \
        -H "user-agent: msnbot/1.1 (+http://search.msn.com/msnbot.htm)" \
        "http://localhost:3000/"
      ```
* **Response**
    * **Status Code**: `200`
    * **Headers**:
      ```json
      {
        "Connection": "keep-alive",
        "Content-Length": "302",
        "Content-Type": "text/html; charset=utf-8",
        "Date": "Thu, 27 Jul 2023 11:52:55 GMT",
        "ETag": "W/\"12e-KOzWPVFFMMAcJppYazEO/rtl+yk\"",
        "Keep-Alive": "timeout=5",
        "X-Powered-By": "Express"
      }
      ```
    * **Body**:
      ```html
      <!doctype html>
      <html lang="en">
      <body>
      <a href="/search">Search</a>
      <form method="post" action="/">
        <label for="words">Enter some words</label>
        <input name="words" id="words" />
        <button type="submit">Submit</button>
      </form>
      a3b294255c349c0a0abd77ffa5cb26be
      <ul><li>ZAP</li></ul>
      </body>
      </html>
      
      ```

</details>

### Unknown Severity

#### Weak Crypto 

**Severity**: [Unknown](#Unknown) | **Type**: code smell | **Fix**: unknown | **Found By**: [@continuous-security/scanner-javascript-js-x-ray](https://www.npmjs.com/package/@continuous-security/scanner-javascript-js-x-ray)

The code probably contains a weak crypto algorithm (md5, sha1...)

##### Evidence

The following examples were found in the application.

`app.js` (starting on line: 13)
```javascript
11| }
12| 
13| const startTimeHash = createHash("md5").update(new Date().toString()).digest("hex");
14| 
15| const port = process.env["PORT"] || 3000;
```


#### Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') 

**Severity**: [Unknown](#Unknown) | **Type**: code smell | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-javascript-njsscan](https://www.npmjs.com/package/@continuous-security/scanner-javascript-njsscan)

Untrusted User Input in Response will result in Reflected Cross Site Scripting Vulnerability.

##### Evidence

The following examples were found in the application.

`app.js` (starting on line: 90)
```javascript
88| 
89| app.all('/search', (req, res) => {
90|   res.send(`${searchPage.replace('%%SEARCH%%', `<p>You searched for: ${req.query['q']}</p>`)}`);
91| });
92| 
```


##### References

[CWE-79](#CWE-79)

#### Use of a Broken or Risky Cryptographic Algorithm 

**Severity**: [Unknown](#Unknown) | **Type**: code smell | **Fix**: Unknown | **Found By**: [@continuous-security/scanner-javascript-njsscan](https://www.npmjs.com/package/@continuous-security/scanner-javascript-njsscan)

MD5 is a a weak hash which is known to have collision. Use a strong hashing function.

##### Evidence

The following examples were found in the application.

`app.js` (starting on line: 13)
```javascript
11| }
12| 
13| const startTimeHash = createHash("md5").update(new Date().toString()).digest("hex");
14| 
15| const port = process.env["PORT"] || 3000;
```


##### References

[CWE-327](#CWE-327)



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
