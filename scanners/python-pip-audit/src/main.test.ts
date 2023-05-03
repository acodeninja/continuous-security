import scanner from './main';
import {pythonPipAuditReport} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('js-x-ray scanner', () => {
  test('has the right name', () => {
    expect(scanner).toHaveProperty(
      'name',
      '@continuous-security/scanner-python-pip-audit',
    );
  });

  test('has the right slug', () => {
    expect(scanner).toHaveProperty('slug', 'python-pip-audit');
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
      (readFile as jest.Mock).mockResolvedValueOnce(pythonPipAuditReport);
      report = await scanner.report('/test');
    });

    test('calls readFile', () => {
      expect(readFile).toHaveBeenCalledWith('/test/report.json');
    });

    test('includes the scanner name', () => {
      expect(report).toHaveProperty(
        'scanner',
        '@continuous-security/scanner-python-pip-audit',
      );
    });

    test('returns the expected issues', () => {
      expect(report).toHaveProperty('issues', expect.arrayContaining([
        {
          title: 'Vulnerable Third-Party Library `cairosvg`',
          severity: 'unknown',
          description: '',
          fix: 'unknown',
          type: 'dependency',
        },
      ]));
    });

    test('returns the issues counts', () => {
      expect(report).toHaveProperty('counts', {
        info: 0,
        low: 0,
        moderate: 0,
        high: 0,
        critical: 0,
        total: 1,
        unknown: 1,
      });
    });
  });
});
