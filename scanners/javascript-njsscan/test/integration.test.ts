import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'nodejs',
  {
    scanner: '@continuous-security/scanner-javascript-njsscan',
    issues: [
      {
        title: 'Improper Neutralization of Input During Web Page Generation (\'Cross-site Scripting\')',
        description: 'Untrusted User Input in Response will result in Reflected Cross Site Scripting Vulnerability.',
        fix: 'Unknown',
        references: ['CWE-79'],
        severity: 'unknown',
        type: 'code smell',
        extracts: [
          {
            language: 'javascript',
            lines: ['6', '6'],
            path: 'app.js',
          },
        ],
      },
      {
        title: 'Use of a Broken or Risky Cryptographic Algorithm',
        description: 'MD5 is a a weak hash which is known to have collision. Use a strong hashing function.',
        fix: 'Unknown',
        references: ['CWE-327'],
        severity: 'unknown',
        type: 'code smell',
        extracts: [
          {
            lines: ['2', '3'],
            path: 'main.js',
            language: 'javascript',
          },
        ],
      },
    ],
  },
);
