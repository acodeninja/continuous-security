import scanner from './main';
import {njsscanReport} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('javascript-njsscan scanner', () => {
  test('has the right name', () => {
    expect(scanner).toHaveProperty(
      'name',
      '@continuous-security/scanner-javascript-njsscan',
    );
  });

  test('has the right slug', () => {
    expect(scanner).toHaveProperty('slug', 'javascript-njsscan');
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
      (readFile as jest.Mock).mockResolvedValueOnce(njsscanReport);
      report = await scanner.report('/test');
    });

    test('calls readFile', () => {
      expect(readFile).toHaveBeenCalledWith('/test/report.json');
    });

    test('includes the scanner name', () => {
      expect(report).toHaveProperty(
        'scanner',
        '@continuous-security/scanner-javascript-njsscan',
      );
    });

    test('returns an expected issue', () => {
      expect(report).toHaveProperty('issues', expect.arrayContaining([{
        title: 'Use of a Broken or Risky Cryptographic Algorithm',
        description: 'MD5 is a a weak hash which is known to have collision. Use a strong hashing function.',
        extracts: [{
          language: 'javascript',
          lines: ['2', '3'],
          path: 'main.js',
        }],
        fix: 'Unknown',
        references: ['CWE-327'],
        severity: 'unknown',
        type: 'code smell',
      }]));
    });
  });
});
