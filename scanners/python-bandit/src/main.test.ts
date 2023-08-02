import scanner, {translateSeverity} from './main';
import {pythonBanditReport} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('python-bandit scanner', () => {
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
          references: ['CWE-259'],
          fix: 'unknown',
          type: 'code smell',
          extracts: [
            {
              path: 'main.py',
              lines: ['8'],
              language: 'python',
            },
          ],
        },
      ]));
      expect(report).toHaveProperty('issues', expect.arrayContaining([
        {
          title: 'Try, Except, Pass detected.',
          severity: 'low',
          description: '',
          references: ['CWE-703'],
          fix: 'unknown',
          type: 'code smell',
          extracts: [
            {
              path: 'main.py',
              lines: ['4', '5'],
              language: 'python',
            },
          ],
        },
      ]));
    });
  });

  describe('translating issue severity', () => {
    test('LOW translates to low', () => {
      expect(translateSeverity('LOW')).toEqual('low');
    });
    test('MEDIUM translates to moderate', () => {
      expect(translateSeverity('MEDIUM')).toEqual('moderate');
    });
    test('HIGH translates to high', () => {
      expect(translateSeverity('HIGH')).toEqual('high');
    });
    test('UNDEFINED translates to unknown', () => {
      expect(translateSeverity('UNDEFINED')).toEqual('unknown');
    });
  });
});
