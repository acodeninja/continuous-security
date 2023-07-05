import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  'nodejs',
  {
    scanner: '@continuous-security/scanner-javascript-npm-audit',
    issues: [
      {
        description: 'semver vulnerable to Regular Expression Denial of Service',
        fix: 'Upgrade to version above <7.5.2',
        package: {name: 'semver'},
        references: ['CWE-1333', 'GHSA-c2qf-rxjj-qqgw'],
        severity: 'moderate',
        title: 'Vulnerable Third-Party Library `semver`',
        type: 'dependency',
      },
      {
        description: 'Insecure template handling in Squirrelly',
        fix: 'Upgrade to version above <=8.0.8',
        package: {name: 'squirrelly'},
        severity: 'high',
        references: ['CWE-200', 'GHSA-q8j6-pwqx-pm96'],
        title: 'Vulnerable Third-Party Library `squirrelly`',
        type: 'dependency',
      },
    ],
  },
);
