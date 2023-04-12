import scanner from './main';
import {pythonBanditReport} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('js-x-ray scanner', () => {
  test('has the right name', () => {
    expect(scanner).toHaveProperty(
      'name',
      '@continuous-security/scanner-python-bandit',
    );
  });

  test('has the right slug', () => {
    expect(scanner).toHaveProperty('slug', 'python-bandit');
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
      (readFile as jest.Mock).mockResolvedValueOnce(pythonBanditReport);
      report = await scanner.report('/test');
    });

    test('calls readFile', () => {
      expect(readFile).toHaveBeenCalledWith('/test/report.json');
    });

    test('includes the scanner name', () => {
      expect(report).toHaveProperty(
        'scanner',
        '@continuous-security/scanner-python-bandit',
      );
    });

    test('returns the expected issues', () => {
      expect(report).toHaveProperty('issues', expect.arrayContaining([
        {
          title: 'Possible hardcoded password: \'password\'',
          severity: 'low',
          description: '',
          cwe: '259',
          fix: 'unknown',
          type: 'code smell',
          extracts: [
            {
              path: 'main.py',
              lines: ['8'],
              language: 'python',
              code: 'def login(username, password):\n  if password == \'password\':\n    return True',
            },
          ],
        },
      ]));
      expect(report).toHaveProperty('issues', expect.arrayContaining([
        {
          title: 'Try, Except, Pass detected.',
          severity: 'low',
          description: '',
          cwe: '703',
          fix: 'unknown',
          type: 'code smell',
          extracts: [
            {
              path: 'main.py',
              lines: ['4', '5'],
              language: 'python',
              code: '    print(\'thing\')\n  except:\n    pass',
            },
          ],
        },
      ]));
    });

    test('returns the issues counts', () => {
      expect(report).toHaveProperty('counts', {
        info: 0,
        low: 2,
        moderate: 0,
        high: 0,
        critical: 0,
        total: 2,
        unknown: 0,
      });
    });
  });
});
