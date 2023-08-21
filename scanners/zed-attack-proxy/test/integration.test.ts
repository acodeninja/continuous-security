import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  scanner,
  process,
  'javascript',
  {
    scanner: '@continuous-security/scanner-zed-attack-proxy', issues: expect.arrayContaining([{
      title: 'Missing Anti-clickjacking Header',
      description: expect.stringContaining('Content-Security-Policy'),
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
      description: expect.stringContaining('X-Content-Type-Options'),
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
      description: expect.stringContaining('X-Powered-By'),
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
    }]),
  },
  {target: 'http://localhost:3000'},
);
