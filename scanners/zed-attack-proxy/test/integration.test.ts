import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'nodejs',
  {
    scanner: '@continuous-security/scanner-zed-attack-proxy',
    issues: [{
      title: 'Missing Anti-clickjacking Header',
      description: 'The response does not include either Content-Security-Policy with \'frame-ancestors\' directive or X-Frame-Options to protect against \'ClickJacking\' attacks.',
      type: 'web request',
      references: ['CWE-1021'],
      fix: 'Unknown',
      severity: 'moderate',
      requests: [{
        request: {
          target: 'http://172.17.0.1:3000',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 200,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '51',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            ETag: 'W/"33-wKICce4KSwRPViWBjR/iQ36u03M"',
            'Keep-Alive': 'timeout=5',
            'X-Powered-By': 'Express',
          },
        },
      }, {
        request: {
          target: 'http://172.17.0.1:3000/?words=ZAP',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            referer: 'http://172.17.0.1:3000',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 200,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '45',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            ETag: 'W/"2d-YvMABNpwd9rgm8Gm8BdBLwyiq4A"',
            'Keep-Alive': 'timeout=5',
            'X-Powered-By': 'Express',
          },
        },
      }],
    }, {
      title: 'X-Content-Type-Options Header Missing',
      description: 'The Anti-MIME-Sniffing header X-Content-Type-Options was not set to \'nosniff\'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.',
      type: 'web request',
      references: ['CWE-693'],
      fix: 'Unknown',
      severity: 'low',
      requests: [{
        request: {
          target: 'http://172.17.0.1:3000',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 200,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '51',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            ETag: 'W/"33-wKICce4KSwRPViWBjR/iQ36u03M"',
            'Keep-Alive': 'timeout=5',
            'X-Powered-By': 'Express',
          },
        },
      }, {
        request: {
          target: 'http://172.17.0.1:3000/?words=ZAP',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            referer: 'http://172.17.0.1:3000',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 200,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '45',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            ETag: 'W/"2d-YvMABNpwd9rgm8Gm8BdBLwyiq4A"',
            'Keep-Alive': 'timeout=5',
            'X-Powered-By': 'Express',
          },
        },
      }],
    }, {
      title: 'Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s)',
      description: 'The web/application server is leaking information via one or more "X-Powered-By" HTTP response headers. Access to such information may facilitate attackers identifying other frameworks/components your web application is reliant upon and the vulnerabilities such components may be subject to.',
      type: 'web request',
      references: ['CWE-200'],
      fix: 'Unknown',
      severity: 'low',
      requests: [{
        request: {
          target: 'http://172.17.0.1:3000',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 200,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '51',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            ETag: 'W/"33-wKICce4KSwRPViWBjR/iQ36u03M"',
            'Keep-Alive': 'timeout=5',
            'X-Powered-By': 'Express',
          },
        },
      }, {
        request: {
          target: 'http://172.17.0.1:3000/?words=ZAP',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            referer: 'http://172.17.0.1:3000',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 200,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '45',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            ETag: 'W/"2d-YvMABNpwd9rgm8Gm8BdBLwyiq4A"',
            'Keep-Alive': 'timeout=5',
            'X-Powered-By': 'Express',
          },
        },
      }, {
        request: {
          target: 'http://172.17.0.1:3000/robots.txt',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 404,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '149',
            'Content-Security-Policy': 'default-src \'none\'',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            'Keep-Alive': 'timeout=5',
            'X-Content-Type-Options': 'nosniff',
            'X-Powered-By': 'Express',
          },
        },
      }, {
        request: {
          target: 'http://172.17.0.1:3000/sitemap.xml',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 404,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '150',
            'Content-Security-Policy': 'default-src \'none\'',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            'Keep-Alive': 'timeout=5',
            'X-Content-Type-Options': 'nosniff',
            'X-Powered-By': 'Express',
          },
        },
      }],
    }, {
      title: 'Content Security Policy (CSP) Header Not Set',
      description: 'Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.',
      type: 'web request',
      references: ['CWE-693'],
      fix: 'Unknown',
      severity: 'moderate',
      requests: [{
        request: {
          target: 'http://172.17.0.1:3000',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 200,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '51',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            ETag: 'W/"33-wKICce4KSwRPViWBjR/iQ36u03M"',
            'Keep-Alive': 'timeout=5',
            'X-Powered-By': 'Express',
          },
        },
      }, {
        request: {
          target: 'http://172.17.0.1:3000/?words=ZAP',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            referer: 'http://172.17.0.1:3000',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 200,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '45',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            ETag: 'W/"2d-YvMABNpwd9rgm8Gm8BdBLwyiq4A"',
            'Keep-Alive': 'timeout=5',
            'X-Powered-By': 'Express',
          },
        },
      }],
    }, {
      title: 'CSP: Wildcard Directive',
      description: 'Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks. Including (but not limited to) Cross Site Scripting (XSS), and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.',
      type: 'web request',
      references: ['CWE-693'],
      fix: 'Unknown',
      severity: 'moderate',
      requests: [{
        request: {
          target: 'http://172.17.0.1:3000/robots.txt',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 404,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '149',
            'Content-Security-Policy': 'default-src \'none\'',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            'Keep-Alive': 'timeout=5',
            'X-Content-Type-Options': 'nosniff',
            'X-Powered-By': 'Express',
          },
        },
      }, {
        request: {
          target: 'http://172.17.0.1:3000/sitemap.xml',
          method: 'GET',
          headers: {
            'cache-control': 'no-cache',
            host: '172.17.0.1:3000',
            pragma: 'no-cache',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
          },
        },
        response: {
          statusCode: 404,
          headers: {
            Connection: 'keep-alive',
            'Content-Length': '150',
            'Content-Security-Policy': 'default-src \'none\'',
            'Content-Type': 'text/html; charset=utf-8',
            Date: expect.stringContaining('GMT'),
            'Keep-Alive': 'timeout=5',
            'X-Content-Type-Options': 'nosniff',
            'X-Powered-By': 'Express',
          },
        },
      }],
    }],
  },
  {
    target: 'http://172.17.0.1:3000',
  },
);
