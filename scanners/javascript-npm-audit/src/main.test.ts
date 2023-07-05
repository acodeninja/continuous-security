import scanner from './main';
import {npmAuditNoFix, npmAuditWithFix} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('javascript-npm-audit scanner', () => {
  test('has the right name', () => {
    expect(scanner).toHaveProperty(
      'name',
      '@continuous-security/scanner-javascript-npm-audit',
    );
  });

  test('has the right slug', () => {
    expect(scanner).toHaveProperty('slug', 'javascript-npm-audit');
  });

  test('has the right build configuration', () => {
    expect(scanner.buildConfiguration).toHaveProperty('files', {
      Dockerfile: '',
      'scan.sh': '',
    });
  });

  test('has a report function', () => {
    expect(scanner).toHaveProperty('report', expect.any(Function));
  });

  describe('generating a report', () => {
    let report: ScanReport;

    beforeAll(async () => {
      (readFile as jest.Mock).mockResolvedValueOnce(npmAuditNoFix);
      report = await scanner.report('/test');
    });

    test('calls readFile', () => {
      expect(readFile).toHaveBeenCalledWith('/test/report.json');
    });

    test('includes the scanner name', () => {
      expect(report).toHaveProperty(
        'scanner',
        '@continuous-security/scanner-javascript-npm-audit',
      );
    });

    test('returns the expected issues', () => {
      expect(report).toHaveProperty('issues', expect.arrayContaining([{
        title: 'Vulnerable Third-Party Library `squirrelly`',
        description: 'Insecure template handling in Squirrelly',
        type: 'dependency',
        package: {name: 'squirrelly'},
        references: ['CWE-200', 'GHSA-q8j6-pwqx-pm96'],
        severity: 'high',
        fix: 'No known fix',
      }]));

      expect(report).toHaveProperty('issues', expect.arrayContaining([{
        title: 'Vulnerable Third-Party Library `semver`',
        description: 'semver vulnerable to Regular Expression Denial of Service',
        type: 'dependency',
        package: {name: 'semver'},
        references: ['CWE-1333', 'GHSA-c2qf-rxjj-qqgw'],
        severity: 'moderate',
        fix: 'Upgrade to version above <7.5.2',
      }]));
    });

    describe('generating a report with a proposed fix', () => {
      let report: ScanReport;

      beforeAll(async () => {
        (readFile as jest.Mock).mockResolvedValueOnce(npmAuditWithFix);
        report = await scanner.report('/test');
      });

      test('returns an expected issue', () => {
        expect(report).toHaveProperty('issues', expect.arrayContaining([
          expect.objectContaining({
            fix: 'Upgrade to version above <=8.0.8',
          }),
        ]));
      });
    });
  });
});
