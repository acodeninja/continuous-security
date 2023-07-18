import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'javascript',
  {
    scanner: '@continuous-security/scanner-javascript-js-x-ray',
    issues: [
      {
        description: 'Unable to follow an import (require, require.resolve) statement/expr.',
        extracts: [{
          language: 'javascript',
          lines: ['8'],
          path: 'app.js',
        }],
        fix: 'unknown',
        severity: 'moderate',
        title: 'Unsafe Import',
        type: 'code smell',
      },
      {
        description: 'The code probably contains a weak crypto algorithm (md5, sha1...)',
        extracts: [{
          language: 'javascript',
          lines: ['13'],
          path: 'app.js',
        }],
        fix: 'unknown',
        severity: 'unknown',
        title: 'Weak Crypto',
        type: 'code smell',
      },
      {
        title: 'Unsafe Regex',
        description: 'A RegEx as been detected as unsafe and may be used for a ReDoS Attack.',
        fix: 'unknown',
        severity: 'moderate',
        type: 'code smell',
        extracts: [
          {
            path: 'app.js',
            lines: ['64'],
            language: 'javascript',
          },
        ],
      },
    ],
  },
);
