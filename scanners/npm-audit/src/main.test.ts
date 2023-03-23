import scanner from './main';
import {npmAuditNoFix, npmAuditWithFix} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('npm-audit scanner', () => {
  test('has the right name', () => {
    expect(scanner).toHaveProperty(
      'name',
      '@continuous-security/scanner-npm-audit',
    );
  });

  test('has the right slug', () => {
    expect(scanner).toHaveProperty('slug', 'npm-audit');
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
        '@continuous-security/scanner-npm-audit',
      );
    });

    test('returns an expected issue', () => {
      expect(report).toHaveProperty('issues', expect.arrayContaining([{
        title: 'Vulnerable Third-Party Library `squirrelly`',
        description: 'Insecure template handling in Squirrelly',
        type: 'dependency',
        package: 'squirrelly',
        cwe: ['200'],
        severity: 'high',
        fix: 'Unknown',
      }]));
    });

    test('returns the issues counts', () => {
      expect(report).toHaveProperty('counts', {
        info: 0,
        low: 0,
        moderate: 0,
        high: 1,
        critical: 0,
        total: 1,
        unknown: 0,
      });
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
