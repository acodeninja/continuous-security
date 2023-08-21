import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  scanner,
  process,
  'javascript',
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
        extracts: [{
          language: 'javascript',
          lines: ['90'],
          path: 'app.js',
        }],
      },
      {
        title: 'Use of a Broken or Risky Cryptographic Algorithm',
        description: 'MD5 is a a weak hash which is known to have collision. Use a strong hashing function.',
        fix: 'Unknown',
        references: ['CWE-327'],
        severity: 'unknown',
        type: 'code smell',
        extracts: [{
          lines: ['13'],
          path: 'app.js',
          language: 'javascript',
        }],
      },
    ],
  },
);
