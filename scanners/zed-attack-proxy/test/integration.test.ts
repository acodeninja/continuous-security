import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'javascript',
  {
    scanner: '@continuous-security/scanner-zed-attack-proxy', issues: expect.arrayContaining([{
      title: 'Missing Anti-clickjacking Header',
      description: 'The response does not include either Content-Security-Policy with \'frame-ancestors\' directive or X-Frame-Options to protect against \'ClickJacking\' attacks.',
      type: 'web request',
      references: ['CWE-1021'],
      fix: 'Unknown',
      severity: 'moderate',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'GET',
          headers: expect.objectContaining({host: 'localhost:3000'}),
        },
        response: {
          statusCode: 200,
          headers: expect.objectContaining({'X-Powered-By': 'Express'}),
          body: expect.stringMatching(/<!(doctype|DOCTYPE) html>/),
        },
      }]),
    }, {
      title: 'X-Content-Type-Options Header Missing',
      description: 'The Anti-MIME-Sniffing header X-Content-Type-Options was not set to \'nosniff\'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.',
      type: 'web request',
      references: ['CWE-693'],
      fix: 'Unknown',
      severity: 'low',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'GET',
          headers: expect.objectContaining({host: 'localhost:3000'}),
        },
        response: {
          statusCode: 200,
          headers: expect.objectContaining({'X-Powered-By': 'Express'}),
          body: expect.stringMatching(/<!(doctype|DOCTYPE) html>/),
        },
      }]),
    }, {
      title: 'Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s)',
      description: 'The web/application server is leaking information via one or more "X-Powered-By" HTTP response headers. Access to such information may facilitate attackers identifying other frameworks/components your web application is reliant upon and the vulnerabilities such components may be subject to.',
      type: 'web request',
      references: ['CWE-200'],
      fix: 'Unknown',
      severity: 'low',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'GET',
          headers: expect.objectContaining({host: 'localhost:3000'}),
        },
        response: {
          statusCode: 200,
          headers: expect.objectContaining({'X-Powered-By': 'Express'}),
          body: expect.stringMatching(/<!(doctype|DOCTYPE) html>/),
        },
      }]),
    }, {
      title: 'Content Security Policy (CSP) Header Not Set',
      description: 'Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.',
      type: 'web request',
      references: ['CWE-693'],
      fix: 'Unknown',
      severity: 'moderate',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'GET',
          headers: expect.objectContaining({host: 'localhost:3000'}),
        },
        response: {
          statusCode: 200,
          headers: expect.objectContaining({'X-Powered-By': 'Express'}),
          body: expect.stringMatching(/<!(doctype|DOCTYPE) html>/),
        },
      }]),
    }, {
      title: 'CSP: Wildcard Directive',
      description: 'Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks. Including (but not limited to) Cross Site Scripting (XSS), and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.',
      type: 'web request',
      references: ['CWE-693'],
      fix: 'Unknown',
      severity: 'moderate',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'GET',
          headers: expect.objectContaining({host: 'localhost:3000'}),
        },
        response: {
          statusCode: 404,
          headers: expect.objectContaining({'X-Powered-By': 'Express'}),
          body: expect.stringMatching(/<!(doctype|DOCTYPE) html>/),
        },
      }]),
    }, {
      title: 'User Agent Fuzzer',
      description: 'Check for differences in response based on fuzzed User Agent (eg. mobile sites, access as a Search Engine Crawler). Compares the response statuscode and the hashcode of the response body with the original response.',
      type: 'web request',
      references: [],
      fix: 'Unknown',
      severity: 'info',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'GET',
          headers: expect.objectContaining({host: 'localhost:3000'}),
        },
        response: {
          statusCode: 200,
          headers: expect.objectContaining({'X-Powered-By': 'Express'}),
          body: expect.stringMatching(/<!(doctype|DOCTYPE) html>/),
        },
      }]),
    }, {
      title: 'Absence of Anti-CSRF Tokens',
      description: 'No Anti-CSRF tokens were found in a HTML submission form.\nA cross-site request forgery is an attack that involves forcing a victim to send an HTTP request to a target destination without their knowledge or intent in order to perform an action as the victim. The underlying cause is application functionality using predictable URL/form actions in a repeatable way. The nature of the attack is that CSRF exploits the trust that a web site has for a user. By contrast, cross-site scripting (XSS) exploits the trust that a user has for a web site. Like XSS, CSRF attacks are not necessarily cross-site, but they can be. Cross-site request forgery is also known as CSRF, XSRF, one-click attack, session riding, confused deputy, and sea surf.\n\nCSRF attacks are effective in a number of situations, including:\n    * The victim has an active session on the target site.\n    * The victim is authenticated via HTTP auth on the target site.\n    * The victim is on the same local network as the target site.\n\nCSRF has primarily been used to perform an action against a target site using the victim\'s privileges, but recent techniques have been discovered to disclose information by gaining access to the response. The risk of information disclosure is dramatically increased when the target site is vulnerable to XSS, because XSS can be used as a platform for CSRF, allowing the attack to operate within the bounds of the same-origin policy.',
      type: 'web request',
      references: ['CWE-352'],
      fix: 'Unknown',
      severity: 'moderate',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'GET',
          headers: expect.objectContaining({host: 'localhost:3000'}),
        },
        response: {
          statusCode: 200,
          headers: expect.objectContaining({'X-Powered-By': 'Express'}),
          body: expect.stringMatching(/<!(doctype|DOCTYPE) html>/),
        },
      }]),
    }, {
      title: 'Cross Site Scripting (Reflected)',
      description: 'Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user\'s browser instance. A browser instance can be a standard web browser client, or a browser object embedded in a software product such as the browser within WinAmp, an RSS reader, or an email client. The code itself is usually written in HTML/JavaScript, but may also extend to VBScript, ActiveX, Java, Flash, or any other browser-supported technology.\nWhen an attacker gets a user\'s browser to execute his/her code, the code will run within the security context (or zone) of the hosting web site. With this level of privilege, the code has the ability to read, modify and transmit any sensitive data accessible by the browser. A Cross-site Scripted user could have his/her account hijacked (cookie theft), their browser redirected to another location, or possibly shown fraudulent content delivered by the web site they are visiting. Cross-site Scripting attacks essentially compromise the trust relationship between a user and the web site. Applications utilizing browser object instances which load content from the file system may execute code under the local machine zone allowing for system compromise.\n\nThere are three types of Cross-site Scripting attacks: non-persistent, persistent and DOM-based.\nNon-persistent attacks and DOM-based attacks require a user to either visit a specially crafted link laced with malicious code, or visit a malicious web page containing a web form, which when posted to the vulnerable site, will mount the attack. Using a malicious form will oftentimes take place when the vulnerable resource only accepts HTTP POST requests. In such a case, the form can be submitted automatically, without the victim\'s knowledge (e.g. by using JavaScript). Upon clicking on the malicious link or submitting the malicious form, the XSS payload will get echoed back and will get interpreted by the user\'s browser and execute. Another technique to send almost arbitrary requests (GET and POST) is by using an embedded client, such as Adobe Flash.\nPersistent attacks occur when the malicious code is submitted to a web site where it\'s stored for a period of time. Examples of an attacker\'s favorite targets often include message board posts, web mail messages, and web chat software. The unsuspecting user is not required to interact with any additional site/link (e.g. an attacker site or a malicious link sent via email), just simply view the web page containing the code.',
      type: 'web request',
      references: ['CWE-79'],
      fix: 'Unknown',
      severity: 'high',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'GET',
          headers: expect.objectContaining({host: 'localhost:3000'}),
        },
        response: {
          statusCode: 200,
          headers: expect.objectContaining({'X-Powered-By': 'Express'}),
          body: expect.stringMatching(/<!(doctype|DOCTYPE) html>/),
        },
      }]),
    }, {
      title: 'Cross Site Scripting (Persistent)',
      description: 'Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user\'s browser instance. A browser instance can be a standard web browser client, or a browser object embedded in a software product such as the browser within WinAmp, an RSS reader, or an email client. The code itself is usually written in HTML/JavaScript, but may also extend to VBScript, ActiveX, Java, Flash, or any other browser-supported technology.\nWhen an attacker gets a user\'s browser to execute his/her code, the code will run within the security context (or zone) of the hosting web site. With this level of privilege, the code has the ability to read, modify and transmit any sensitive data accessible by the browser. A Cross-site Scripted user could have his/her account hijacked (cookie theft), their browser redirected to another location, or possibly shown fraudulent content delivered by the web site they are visiting. Cross-site Scripting attacks essentially compromise the trust relationship between a user and the web site. Applications utilizing browser object instances which load content from the file system may execute code under the local machine zone allowing for system compromise.\n\nThere are three types of Cross-site Scripting attacks: non-persistent, persistent and DOM-based.\nNon-persistent attacks and DOM-based attacks require a user to either visit a specially crafted link laced with malicious code, or visit a malicious web page containing a web form, which when posted to the vulnerable site, will mount the attack. Using a malicious form will oftentimes take place when the vulnerable resource only accepts HTTP POST requests. In such a case, the form can be submitted automatically, without the victim\'s knowledge (e.g. by using JavaScript). Upon clicking on the malicious link or submitting the malicious form, the XSS payload will get echoed back and will get interpreted by the user\'s browser and execute. Another technique to send almost arbitrary requests (GET and POST) is by using an embedded client, such as Adobe Flash.\nPersistent attacks occur when the malicious code is submitted to a web site where it\'s stored for a period of time. Examples of an attacker\'s favorite targets often include message board posts, web mail messages, and web chat software. The unsuspecting user is not required to interact with any additional site/link (e.g. an attacker site or a malicious link sent via email), just simply view the web page containing the code.',
      type: 'web request',
      references: ['CWE-79'],
      fix: 'Unknown',
      severity: 'high',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'POST',
          headers: expect.objectContaining({host: 'localhost:3000'}),
          body: 'words=ZAP',
        },
        response: {
          statusCode: 200,
          headers: expect.objectContaining({'X-Powered-By': 'Express'}),
          body: expect.stringMatching(/<!(doctype|DOCTYPE) html>/),
        },
      }]),
    }, {
      title: 'Cross Site Scripting (DOM Based)',
      description: 'Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user\'s browser instance. A browser instance can be a standard web browser client, or a browser object embedded in a software product such as the browser within WinAmp, an RSS reader, or an email client. The code itself is usually written in HTML/JavaScript, but may also extend to VBScript, ActiveX, Java, Flash, or any other browser-supported technology.\nWhen an attacker gets a user\'s browser to execute his/her code, the code will run within the security context (or zone) of the hosting web site. With this level of privilege, the code has the ability to read, modify and transmit any sensitive data accessible by the browser. A Cross-site Scripted user could have his/her account hijacked (cookie theft), their browser redirected to another location, or possibly shown fraudulent content delivered by the web site they are visiting. Cross-site Scripting attacks essentially compromise the trust relationship between a user and the web site. Applications utilizing browser object instances which load content from the file system may execute code under the local machine zone allowing for system compromise.\n\nThere are three types of Cross-site Scripting attacks: non-persistent, persistent and DOM-based.\nNon-persistent attacks and DOM-based attacks require a user to either visit a specially crafted link laced with malicious code, or visit a malicious web page containing a web form, which when posted to the vulnerable site, will mount the attack. Using a malicious form will oftentimes take place when the vulnerable resource only accepts HTTP POST requests. In such a case, the form can be submitted automatically, without the victim\'s knowledge (e.g. by using JavaScript). Upon clicking on the malicious link or submitting the malicious form, the XSS payload will get echoed back and will get interpreted by the user\'s browser and execute. Another technique to send almost arbitrary requests (GET and POST) is by using an embedded client, such as Adobe Flash.\nPersistent attacks occur when the malicious code is submitted to a web site where it\'s stored for a period of time. Examples of an attacker\'s favorite targets often include message board posts, web mail messages, and web chat software. The unsuspecting user is not required to interact with any additional site/link (e.g. an attacker site or a malicious link sent via email), just simply view the web page containing the code.',
      type: 'web request',
      references: ['CWE-79'],
      fix: 'Unknown',
      severity: 'high',
      requests: expect.arrayContaining([{
        request: {
          target: expect.stringContaining('http://localhost:3000'),
          method: 'GET',
          headers: expect.objectContaining({host: 'localhost:3000'}),
        },
        response: {
          statusCode: 0,
          headers: {},
          body: undefined,
        },
      }]),
    }]),
  },
  {target: 'http://localhost:3000'},
);
