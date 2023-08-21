import scanner from '../src/main';
import {setupIntegrationTests} from '../../_base/test/integration';

setupIntegrationTests(
  scanner,
  process,
  'ruby',
  {
    issues: [
      {
        description: 'ruby-saml gem is vulnerable to XPath injection',
        fix: 'upgrade to \'>= 1.0.0\'',
        package: {
          name: 'ruby-saml',
          version: '0.9.2',
        },
        references: [
          'CVE-2015-20108',
          'GHSA-r364-2pj4-pf7f',
        ],
        severity: 'unknown',
        title: 'Vulnerable Third-Party Library `ruby-saml`',
        type: 'dependency',
      },
      {
        description: 'XML signature wrapping attack',
        fix: 'upgrade to \'>= 1.3.0\'',
        package: {
          name: 'ruby-saml',
          version: '0.9.2',
        },
        references: [
          'CVE-2016-5697',
          'GHSA-36p7-xjw8-h6f2',
        ],
        severity: 'unknown',
        title: 'Vulnerable Third-Party Library `ruby-saml`',
        type: 'dependency',
      },
      {
        description: 'Authentication bypass via incorrect XML canonicalization and DOM traversal',
        fix: 'upgrade to \'>= 1.7.0\'',
        package: {
          name: 'ruby-saml',
          version: '0.9.2',
        },
        references: [
          'CVE-2017-11428',
          'GHSA-x2fr-v8wf-8wwv',
        ],
        severity: 'unknown',
        title: 'Vulnerable Third-Party Library `ruby-saml`',
        type: 'dependency',
      },
      {
        description: 'Ruby-Saml Gem is vulnerable to entity expansion attacks',
        fix: 'upgrade to \'>= 1.0.0\'',
        package: {
          name: 'ruby-saml',
          version: '0.9.2',
        },
        references: [],
        severity: 'unknown',
        title: 'Vulnerable Third-Party Library `ruby-saml`',
        type: 'dependency',
      },
    ],
    scanner: '@continuous-security/scanner-ruby-bundle-audit',
  },
);
