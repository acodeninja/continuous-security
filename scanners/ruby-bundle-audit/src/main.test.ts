import scanner from './main';
import {rubyBundleAuditReport} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('ruby-bundle-audit scanner', () => {
  test('has the right name', () => {
    expect(scanner).toHaveProperty(
      'name',
      '@continuous-security/scanner-ruby-bundle-audit',
    );
  });

  test('has the right slug', () => {
    expect(scanner).toHaveProperty('slug', 'ruby-bundle-audit');
  });

  test('has the right build configuration', () => {
    expect(scanner.buildConfiguration).toHaveProperty('files', {
      Dockerfile: '',
      'scan.rb': '',
    });
  });

  test('has a report function', () => {
    expect(scanner).toHaveProperty('report', expect.any(Function));
  });

  describe('generating a report', () => {
    let report: ScanReport;

    beforeAll(async () => {
      (readFile as jest.Mock).mockResolvedValueOnce(rubyBundleAuditReport);
      report = await scanner.report('/test');
    });

    test('calls readFile', () => {
      expect(readFile).toHaveBeenCalledWith('/test/report.json');
    });

    test('includes the scanner name', () => {
      expect(report).toHaveProperty(
        'scanner',
        '@continuous-security/scanner-ruby-bundle-audit',
      );
    });

    test('returns the expected issues', () => {
      expect(report).toHaveProperty('issues', expect.arrayContaining([
        {
          description: 'ruby-saml gem is vulnerable to XPath injection',
          fix: 'upgrade to \'>= 1.0.0\'',
          package: {name: 'ruby-saml', version: '0.9.2'},
          references: ['CVE-2015-20108', 'GHSA-r364-2pj4-pf7f'],
          severity: 'unknown',
          title: 'Vulnerable Third-Party Library `ruby-saml`',
          type: 'dependency',
        },
      ]));
      expect(report).toHaveProperty('issues', expect.arrayContaining([
        {
          description: 'XML signature wrapping attack',
          fix: 'upgrade to \'>= 1.3.0\'',
          package: {name: 'ruby-saml', version: '0.9.2'},
          references: ['CVE-2016-5697', 'GHSA-36p7-xjw8-h6f2'],
          severity: 'unknown',
          title: 'Vulnerable Third-Party Library `ruby-saml`',
          type: 'dependency',
        },
      ]));
      expect(report).toHaveProperty('issues', expect.arrayContaining([
        {
          description: 'Authentication bypass via incorrect XML canonicalization and DOM traversal',
          fix: 'upgrade to \'>= 1.7.0\'',
          package: {name: 'ruby-saml', version: '0.9.2'},
          references: ['CVE-2017-11428', 'GHSA-x2fr-v8wf-8wwv'],
          severity: 'unknown',
          title: 'Vulnerable Third-Party Library `ruby-saml`',
          type: 'dependency',
        },
      ]));
      expect(report).toHaveProperty('issues', expect.arrayContaining([
        {
          description: 'Ruby-Saml Gem is vulnerable to entity expansion attacks',
          fix: 'upgrade to \'>= 1.0.0\'',
          package: {name: 'ruby-saml', version: '0.9.2'},
          references: [],
          severity: 'unknown',
          title: 'Vulnerable Third-Party Library `ruby-saml`',
          type: 'dependency',
        },
      ]));
    });
  });
});
