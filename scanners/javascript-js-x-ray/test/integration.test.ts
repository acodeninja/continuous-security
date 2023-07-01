import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'nodejs',
  {
    scanner: '@continuous-security/scanner-javascript-js-x-ray',
    issues: expect.arrayContaining([
      {
        title: 'Unsafe Regex',
        description: 'A RegEx as been detected as unsafe and may be used for a ReDoS Attack.',
        fix: 'unknown',
        severity: 'moderate',
        type: 'code smell',
        extracts: expect.arrayContaining([
          {
            path: 'main.js',
            lines: ['7'],
            language: 'javascript',
          },
        ]),
      },
    ]),
  },
);
