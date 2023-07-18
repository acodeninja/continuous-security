import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'javascript',
  {
    scanner: '@continuous-security/scanner-javascript-npm-audit',
    issues: [{
      title: 'Vulnerable Third-Party Library `squirrelly`',
      description: 'Insecure template handling in Squirrelly',
      type: 'dependency',
      package: {name: 'squirrelly'},
      references: ['CWE-200', 'GHSA-q8j6-pwqx-pm96'],
      severity: 'high',
      fix: 'Upgrade to version above <=8.0.8',
    }],
  },
);
