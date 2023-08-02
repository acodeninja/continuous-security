import scanner from './main';
import {rubyBundleAuditReport} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('bearer scanner', () => {
  test('has the right name', () => {
    expect(scanner).toHaveProperty(
      'name',
      '@continuous-security/scanner-bearer',
    );
  });

  test('has the right slug', () => {
    expect(scanner).toHaveProperty('slug', 'bearer');
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
        '@continuous-security/scanner-bearer',
      );
    });

    test('returns the expected issues', () => {
      expect(report).toHaveProperty('issues', expect.arrayContaining([
        {
          description: 'Execution of OS command formed with user input detected.',
          fix: 'unknown',
          references: ['CWE-78'],
          severity: 'high',
          title: 'Execution of OS command formed with user input detected.',
          type: 'code smell',
          extracts: [{
            lines: ['4', '4'],
            path: '/app.rb',
            language: 'ruby',
          }],
        },
      ]));
    });
  });
});
