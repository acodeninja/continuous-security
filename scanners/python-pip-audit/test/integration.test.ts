import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'python',
  {
    scanner: '@continuous-security/scanner-python-pip-audit',
    counts: {
      critical: 0,
      high: 0,
      info: 0,
      low: 0,
      moderate: 0,
      total: 1,
      unknown: 1,
    },
    issues: expect.arrayContaining([{
      title: 'Vulnerable Third-Party Library `cairosvg`',
      severity: 'unknown',
      description: '',
      type: 'dependency',
      fix: 'unknown',
      package: {
        name: 'cairosvg',
        version: '2.6.0',
      },
      references: ["PYSEC-2023-9"],
    }]),
  },
);
