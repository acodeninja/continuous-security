import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'nodejs',
  {
    counts: {
      critical: 0,
      high: 0,
      info: 0,
      low: 0,
      moderate: 0,
      total: 1,
      unknown: 1,
    },
    issues: [
      {
        cwe: ['327'],
        description: 'MD5 is a a weak hash which is known to have collision. Use a strong hashing function.',
        fix: 'Unknown',
        severity: 'unknown',
        title: 'Use of a Broken or Risky Cryptographic Algorithm',
        type: 'code smell',
        extracts: [
          {
            code: 'require("crypto")\n  .createHash("md5")',
            lines: ['2', '3'],
            path: 'main.js',
          },
        ],
      },
    ],
    scanner: '@continuous-security/scanner-njsscan',
  },
);
