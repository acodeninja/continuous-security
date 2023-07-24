module.exports = {
  zapSarifReport: Buffer.from(JSON.stringify({
    runs: [{
      results: [{
        level: 'warning',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/',
            },
            region: {
              startLine: 1,
              snippet: {
                text: '',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'The response does not include either Content-Security-Policy with \'frame-ancestors\' directive or X-Frame-Options to protect against \'ClickJacking\' attacks.',
        },
        ruleId: '10020',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {
            binary: 'd29yZHM9JTNDJTJGbGklM0UlM0NzY3JJcHQlM0VhbGVydCUyODElMjklM0IlM0MlMkZzY1JpcHQlM0UlM0NsaSUzRQ==',
          },
        },
        webResponse: {
          statusCode: 200,
          reasonPhrase: 'OK',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '475695',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            ETag: '"3147526947+ident"',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Thu, 17 Oct 2019 07:18:26 GMT',
            Server: 'ECS (nyb/1D2E)',
            Vary: 'Accept-Encoding',
            'X-Cache': 'HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'warning',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/',
            },
            region: {
              startLine: 1,
              snippet: {
                text: '',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page \u2014 covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.',
        },
        ruleId: '10038',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 200,
          reasonPhrase: 'OK',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '475695',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            ETag: '"3147526947+ident"',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Thu, 17 Oct 2019 07:18:26 GMT',
            Server: 'ECS (nyb/1D2E)',
            Vary: 'Accept-Encoding',
            'X-Cache': 'HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'warning',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/robots.txt',
            },
            region: {
              startLine: 1,
              snippet: {
                text: '',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page \u2014 covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.',
        },
        ruleId: '10038',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/robots.txt',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 404,
          reasonPhrase: 'Not Found',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '524722',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Thu, 29 Jun 2023 10:03:54 GMT',
            Server: 'ECS (nyb/1D18)',
            Vary: 'Accept-Encoding',
            'X-Cache': '404-HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'warning',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/sitemap.xml',
            },
            region: {
              startLine: 1,
              snippet: {
                text: '',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page \u2014 covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.',
        },
        ruleId: '10038',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/sitemap.xml',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 404,
          reasonPhrase: 'Not Found',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '87049',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Tue, 04 Jul 2023 11:38:27 GMT',
            Server: 'ECS (nyb/1D04)',
            Vary: 'Accept-Encoding',
            'X-Cache': '404-HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'note',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/',
            },
            region: {
              startLine: 1,
              snippet: {
                text: '',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.\nAt "High" threshold this scan rule will not alert on client or server error responses.',
        },
        ruleId: '10021',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 200,
          reasonPhrase: 'OK',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '475695',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            ETag: '"3147526947+ident"',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Thu, 17 Oct 2019 07:18:26 GMT',
            Server: 'ECS (nyb/1D2E)',
            Vary: 'Accept-Encoding',
            'X-Cache': 'HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'note',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/',
            },
            region: {
              startLine: 1,
              properties: {
                startLineFailure: 'Resolved invalid start line: 0 - used fallback value instead.',
              },
              snippet: {
                text: 'ECS (nyb/1D2E)',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
        },
        ruleId: '10036',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 200,
          reasonPhrase: 'OK',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '475695',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            ETag: '"3147526947+ident"',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Thu, 17 Oct 2019 07:18:26 GMT',
            Server: 'ECS (nyb/1D2E)',
            Vary: 'Accept-Encoding',
            'X-Cache': 'HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'note',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/robots.txt',
            },
            region: {
              startLine: 1,
              properties: {
                startLineFailure: 'Resolved invalid start line: 0 - used fallback value instead.',
              },
              snippet: {
                text: 'ECS (nyb/1D18)',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
        },
        ruleId: '10036',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/robots.txt',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 404,
          reasonPhrase: 'Not Found',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '524722',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Thu, 29 Jun 2023 10:03:54 GMT',
            Server: 'ECS (nyb/1D18)',
            Vary: 'Accept-Encoding',
            'X-Cache': '404-HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'note',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/sitemap.xml',
            },
            region: {
              startLine: 1,
              properties: {
                startLineFailure: 'Resolved invalid start line: 0 - used fallback value instead.',
              },
              snippet: {
                text: 'ECS (nyb/1D04)',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
        },
        ruleId: '10036',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/sitemap.xml',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 404,
          reasonPhrase: 'Not Found',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '87049',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Tue, 04 Jul 2023 11:38:27 GMT',
            Server: 'ECS (nyb/1D04)',
            Vary: 'Accept-Encoding',
            'X-Cache': '404-HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'none',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/',
            },
            region: {
              startLine: 1,
              properties: {
                startLineFailure: 'Resolved invalid start line: 0 - used fallback value instead.',
              },
              snippet: {
                text: 'HIT',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'The content was retrieved from a shared cache. If the response data is sensitive, personal or user-specific, this may result in sensitive information being leaked. In some cases, this may even result in a user gaining complete control of the session of another user, depending on the configuration of the caching components in use in their environment. This is primarily an issue where caching servers such as "proxy" caches are configured on the local network. This configuration is typically found in corporate or educational environments, for instance. ',
        },
        ruleId: '10050',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 200,
          reasonPhrase: 'OK',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '475695',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            ETag: '"3147526947+ident"',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Thu, 17 Oct 2019 07:18:26 GMT',
            Server: 'ECS (nyb/1D2E)',
            Vary: 'Accept-Encoding',
            'X-Cache': 'HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'none',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/robots.txt',
            },
            region: {
              startLine: 1,
              properties: {
                startLineFailure: 'Resolved invalid start line: 0 - used fallback value instead.',
              },
              snippet: {
                text: 'Age: 524722',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'The presence of the \'Age\' header indicates that that a HTTP/1.1 compliant caching server is in use.',
        },
        ruleId: '10050',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/robots.txt',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 404,
          reasonPhrase: 'Not Found',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '524722',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Thu, 29 Jun 2023 10:03:54 GMT',
            Server: 'ECS (nyb/1D18)',
            Vary: 'Accept-Encoding',
            'X-Cache': '404-HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }, {
        level: 'none',
        locations: [{
          physicalLocation: {
            artifactLocation: {
              uri: 'http://example.com/sitemap.xml',
            },
            region: {
              startLine: 1,
              properties: {
                startLineFailure: 'Resolved invalid start line: 0 - used fallback value instead.',
              },
              snippet: {
                text: 'Age: 87049',
              },
            },
          },
          properties: {
            attack: '',
          },
        }],
        message: {
          text: 'The presence of the \'Age\' header indicates that that a HTTP/1.1 compliant caching server is in use.',
        },
        ruleId: '10050',
        webRequest: {
          protocol: 'HTTP',
          version: '1.1',
          target: 'http://example.com/sitemap.xml',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            Host: 'example.com',
            Pragma: 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
          },
          body: {},
        },
        webResponse: {
          statusCode: 404,
          reasonPhrase: 'Not Found',
          protocol: 'HTTP',
          version: '1.1',
          headers: {
            Age: '87049',
            'Cache-Control': 'max-age=604800',
            Connection: 'keep-alive',
            'Content-Length': '1256',
            'Content-Type': 'text/html; charset=UTF-8',
            Date: 'Wed, 05 Jul 2023 11:49:16 GMT',
            Expires: 'Wed, 12 Jul 2023 11:49:16 GMT',
            'Last-Modified': 'Tue, 04 Jul 2023 11:38:27 GMT',
            Server: 'ECS (nyb/1D04)',
            Vary: 'Accept-Encoding',
            'X-Cache': '404-HIT',
          },
          body: {
            text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n',
          },
          noResponseReceived: false,
        },
      }],
      taxonomies: [{
        downloadUri: 'https://cwe.mitre.org/data/xml/cwec_v4.8.xml.zip',
        guid: 'b000a760-3e52-3565-a35c-f61369da53b7',
        informationUri: 'https://cwe.mitre.org/data/published/cwe_v4.8.pdf',
        isComprehensive: true,
        language: 'en',
        minimumRequiredLocalizedDataSemanticVersion: '4.8',
        name: 'CWE',
        organization: 'MITRE',
        releaseDateUtc: '2022-06-28',
        shortDescription: {
          text: 'The MITRE Common Weakness Enumeration',
        },
        taxa: [{
          guid: '098ecca7-f059-3e81-a2ff-a54023da4848',
          helpUri: 'https://cwe.mitre.org/data/definitions/-1.html',
          id: '-1',
        }, {
          guid: '3bddb023-8ebf-31c6-a225-4e6f9735cc03',
          helpUri: 'https://cwe.mitre.org/data/definitions/200.html',
          id: '200',
        }, {
          guid: 'c60fb1e0-6538-36e7-9dfd-7702d6cf8b1f',
          helpUri: 'https://cwe.mitre.org/data/definitions/693.html',
          id: '693',
        }, {
          guid: 'd8d0ef05-721c-3cbc-8dff-5209722467f8',
          helpUri: 'https://cwe.mitre.org/data/definitions/1021.html',
          id: '1021',
        }],
        version: '4.8',
      }],
      tool: {
        driver: {
          guid: '840570e4-2388-38c0-8afe-ed426f2f5199',
          informationUri: 'https://www.zaproxy.org/',
          name: 'OWASP ZAP',
          rules: [{
            id: '10020',
            defaultConfiguration: {
              level: 'warning',
            },
            fullDescription: {
              text: 'The response does not include either Content-Security-Policy with \'frame-ancestors\' directive or X-Frame-Options to protect against \'ClickJacking\' attacks.',
            },
            name: 'Missing Anti-clickjacking Header',
            properties: {
              references: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options'],
              solution: {
                text: 'Modern Web browsers support the Content-Security-Policy and X-Frame-Options HTTP headers. Ensure one of them is set on all web pages returned by your site/app.\nIf you expect the page to be framed only by pages on your server (e.g. it\'s part of a FRAMESET) then you\'ll want to use SAMEORIGIN, otherwise if you never expect the page to be framed, you should use DENY. Alternatively consider implementing Content Security Policy\'s "frame-ancestors" directive.',
              },
              confidence: 'medium',
            },
            relationships: [{
              kinds: ['superset'],
              target: {
                guid: 'd8d0ef05-721c-3cbc-8dff-5209722467f8',
                id: '1021',
                toolComponent: {
                  guid: 'b000a760-3e52-3565-a35c-f61369da53b7',
                  name: 'CWE',
                },
              },
            }],
            shortDescription: {
              text: 'Missing Anti-clickjacking Header',
            },
          }, {
            id: '10021',
            defaultConfiguration: {
              level: 'note',
            },
            fullDescription: {
              text: 'The Anti-MIME-Sniffing header X-Content-Type-Options was not set to \'nosniff\'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.',
            },
            name: 'X-Content-Type-Options Header Missing',
            properties: {
              references: ['http://msdn.microsoft.com/en-us/library/ie/gg622941%28v=vs.85%29.aspx', 'https://owasp.org/www-community/Security_Headers'],
              solution: {
                text: 'Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to \'nosniff\' for all web pages.\nIf possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.',
              },
              confidence: 'medium',
            },
            relationships: [{
              kinds: ['superset'],
              target: {
                guid: 'c60fb1e0-6538-36e7-9dfd-7702d6cf8b1f',
                id: '693',
                toolComponent: {
                  guid: 'b000a760-3e52-3565-a35c-f61369da53b7',
                  name: 'CWE',
                },
              },
            }],
            shortDescription: {
              text: 'X-Content-Type-Options Header Missing',
            },
          }, {
            id: '10036',
            defaultConfiguration: {
              level: 'note',
            },
            fullDescription: {
              text: 'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
            },
            name: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
            properties: {
              references: ['http://httpd.apache.org/docs/current/mod/core.html#servertokens', 'http://msdn.microsoft.com/en-us/library/ff648552.aspx#ht_urlscan_007', 'http://blogs.msdn.com/b/varunm/archive/2013/04/23/remove-unwanted-http-response-headers.aspx', 'http://www.troyhunt.com/2012/02/shhh-dont-let-your-response-headers.html'],
              solution: {
                text: 'Ensure that your web server, application server, load balancer, etc. is configured to suppress the "Server" header or provide generic details.',
              },
              confidence: 'high',
            },
            relationships: [{
              kinds: ['superset'],
              target: {
                guid: '3bddb023-8ebf-31c6-a225-4e6f9735cc03',
                id: '200',
                toolComponent: {
                  guid: 'b000a760-3e52-3565-a35c-f61369da53b7',
                  name: 'CWE',
                },
              },
            }],
            shortDescription: {
              text: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
            },
          }, {
            id: '10038',
            defaultConfiguration: {
              level: 'warning',
            },
            fullDescription: {
              text: 'Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page \u2014 covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.',
            },
            name: 'Content Security Policy (CSP) Header Not Set',
            properties: {
              references: ['https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy', 'https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html', 'http://www.w3.org/TR/CSP/', 'http://w3c.github.io/webappsec/specs/content-security-policy/csp-specification.dev.html', 'http://www.html5rocks.com/en/tutorials/security/content-security-policy/', 'http://caniuse.com/#feat=contentsecuritypolicy', 'http://content-security-policy.com/'],
              solution: {
                text: 'Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.',
              },
              confidence: 'high',
            },
            relationships: [{
              kinds: ['superset'],
              target: {
                guid: 'c60fb1e0-6538-36e7-9dfd-7702d6cf8b1f',
                id: '693',
                toolComponent: {
                  guid: 'b000a760-3e52-3565-a35c-f61369da53b7',
                  name: 'CWE',
                },
              },
            }],
            shortDescription: {
              text: 'Content Security Policy (CSP) Header Not Set',
            },
          }, {
            id: '10050',
            defaultConfiguration: {
              level: 'none',
            },
            fullDescription: {
              text: 'The content was retrieved from a shared cache. If the response data is sensitive, personal or user-specific, this may result in sensitive information being leaked. In some cases, this may even result in a user gaining complete control of the session of another user, depending on the configuration of the caching components in use in their environment. This is primarily an issue where caching servers such as "proxy" caches are configured on the local network. This configuration is typically found in corporate or educational environments, for instance. ',
            },
            name: 'Retrieved from Cache',
            properties: {
              references: ['https://tools.ietf.org/html/rfc7234', 'https://tools.ietf.org/html/rfc7231', 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html (obsoleted by rfc7234)'],
              solution: {
                text: 'Validate that the response does not contain sensitive, personal or user-specific information.  If it does, consider the use of the following HTTP response headers, to limit, or prevent the content being stored and retrieved from the cache by another user:\nCache-Control: no-cache, no-store, must-revalidate, private\nPragma: no-cache\nExpires: 0\nThis configuration directs both HTTP 1.0 and HTTP 1.1 compliant caching servers to not store the response, and to not retrieve the response (without validation) from the cache, in response to a similar request.',
              },
              confidence: 'medium',
            },
            relationships: [],
            shortDescription: {
              text: 'Retrieved from Cache',
            },
          }],
          semanticVersion: '2.12.0',
          supportedTaxonomies: [{
            guid: 'b000a760-3e52-3565-a35c-f61369da53b7',
            name: 'CWE',
          }],
          version: '2.12.0',
        },
      },
    }],
    $schema: 'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
    version: '2.1.0',
  })),
};
