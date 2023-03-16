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
      high: 1,
      info: 0,
      low: 0,
      moderate: 0,
      total: 1,
      unknown: 0,
    },
    issues: [
      {
        cwe: ['200'],
        description: 'Insecure template handling in Squirrelly',
        fix: 'Unknown',
        package: 'squirrelly',
        severity: 'high',
        title: 'Vulnerable Third-Party Library `squirrelly`',
        type: 'dependency',
      },
    ],
    scanner: '@continuous-security/scanner-npm-audit',
  },
);
