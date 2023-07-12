import scanner from './main';
import {zapSarifReport} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('zed-attack-proxy scanner', () => {
  test('has the right name', () => {
    expect(scanner).toHaveProperty(
      'name',
      '@continuous-security/scanner-zed-attack-proxy',
    );
  });

  test('has the right slug', () => {
    expect(scanner).toHaveProperty('slug', 'zed-attack-proxy');
  });

  test('has the right build configuration', () => {
    expect(scanner.buildConfiguration).toHaveProperty('files', {
      Dockerfile: '',
      'scan.sh': '',
      'zap.yml': '',
    });
  });

  test('has a report function', () => {
    expect(scanner).toHaveProperty('report', expect.any(Function));
  });

  describe('generating a report', () => {
    let report: ScanReport;

    beforeAll(async () => {
      (readFile as jest.Mock).mockResolvedValueOnce(zapSarifReport);
      report = await scanner.report('/test');
    });

    test('calls readFile', () => {
      expect(readFile).toHaveBeenCalledWith('/test/report.json');
    });

    test('includes the scanner name', () => {
      expect(report).toHaveProperty(
        'scanner',
        '@continuous-security/scanner-zed-attack-proxy',
      );
    });

    test('returns the expected issues', () => {
      expect(report).toHaveProperty('issues', expect.arrayContaining([{
        title: 'Missing Anti-clickjacking Header',
        description: 'The response does not include either Content-Security-Policy with \'frame-ancestors\' directive or X-Frame-Options to protect against \'ClickJacking\' attacks.',
        type: 'web request',
        references: ['CWE-1021'],
        fix: 'Unknown',
        severity: 'moderate',
        requests: [{
          request: {
            target: 'http://example.com/',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 200,
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
            target: 'http://example.com/',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 200,
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
          },
        }],
      }, {
        title: 'Server Leaks Version Information via "Server" HTTP Response Header Field',
        description: 'The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.',
        type: 'web request',
        references: ['CWE-200'],
        fix: 'Unknown',
        severity: 'low',
        requests: [{
          request: {
            target: 'http://example.com/',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 200,
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
          },
        }, {
          request: {
            target: 'http://example.com/robots.txt',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 404,
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
          },
        }, {
          request: {
            target: 'http://example.com/sitemap.xml',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 404,
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
            target: 'http://example.com/',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 200,
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
          },
        }, {
          request: {
            target: 'http://example.com/robots.txt',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 404,
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
          },
        }, {
          request: {
            target: 'http://example.com/sitemap.xml',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 404,
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
          },
        }],
      }, {
        title: 'Retrieved from Cache',
        description: 'The content was retrieved from a shared cache. If the response data is sensitive, personal or user-specific, this may result in sensitive information being leaked. In some cases, this may even result in a user gaining complete control of the session of another user, depending on the configuration of the caching components in use in their environment. This is primarily an issue where caching servers such as "proxy" caches are configured on the local network. This configuration is typically found in corporate or educational environments, for instance. ',
        type: 'web request',
        references: [],
        fix: 'Unknown',
        severity: 'info',
        requests: [{
          request: {
            target: 'http://example.com/',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 200,
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
          },
        }, {
          request: {
            target: 'http://example.com/robots.txt',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 404,
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
          },
        }, {
          request: {
            target: 'http://example.com/sitemap.xml',
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              Host: 'example.com',
              Pragma: 'no-cache',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
            },
          },
          response: {
            statusCode: 404,
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
          },
        }],
      }]));
    });
  });
});
