import scanner from './main';
import {jsXRayReport} from '../test/fixtures';
import {readFile} from 'fs/promises';

jest.mock('fs/promises', () => ({readFile: jest.fn()}));

describe('js-x-ray scanner', () => {
  test('has the right name', () => {
    expect(scanner).toHaveProperty(
      'name',
      '@continuous-security/scanner-js-x-ray',
    );
  });

  test('has the right slug', () => {
    expect(scanner).toHaveProperty('slug', 'js-x-ray');
  });

  test('has the right build configuration', () => {
    expect(scanner.buildConfiguration).toHaveProperty('files', {
      Dockerfile: '',
      'scan.mjs': '',
    });
  });

  test('has a report function', () => {
    expect(scanner).toHaveProperty('report', expect.any(Function));
  });

  describe('generating a report', () => {
    let report: ScanReport;

    beforeAll(async () => {
      (readFile as jest.Mock).mockResolvedValueOnce(jsXRayReport);
      report = await scanner.report('/test');
    });

    test('calls readFile', () => {
      expect(readFile).toHaveBeenCalledWith('/test/report.json');
    });

    test('includes the scanner name', () => {
      expect(report).toHaveProperty(
        'scanner',
        '@continuous-security/scanner-js-x-ray',
      );
    });

    test('returns an expected issue', () => {
      expect(report).toHaveProperty('issues', expect.arrayContaining([{
        description: 'A RegEx as been detected as unsafe and may be used for a ReDoS Attack.',
        extracts: expect.arrayContaining([
          {
            path: 'node_modules/squirrelly/dist/browser/squirrelly.dev.js',
            lines: ['141'],
            code: '`(?:\\\\[\\s\\S]|\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\\${)[^\\\\`])*`',
          },
          {
            path: 'node_modules/squirrelly/dist/squirrelly.cjs.js',
            lines: ['167'],
            code: '`(?:\\\\[\\s\\S]|\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\\${)[^\\\\`])*`',
          },
          {
            path: 'node_modules/squirrelly/dist/squirrelly.es.js',
            lines: ['163'],
            code: '`(?:\\\\[\\s\\S]|\\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\\${)[^\\\\`])*`',
          },
        ]),
        fix: 'unknown',
        severity: 'moderate',
        title: 'Unsafe Regex',
        type: 'code smell',
      }]));
    });

    test('returns the issues counts', () => {
      expect(report).toHaveProperty('counts', {
        info: 0,
        low: 0,
        moderate: 1,
        high: 0,
        critical: 0,
        total: 1,
        unknown: 0,
      });
    });
  });
});