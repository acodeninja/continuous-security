import {isURL, loadScannerModule, makeTemporaryFolder, packFiles} from './Helpers';
import {tmpdir} from 'os';
import {mkdtemp} from 'fs/promises';
import {Transform} from 'stream';
import {exec} from 'child_process';

jest.mock('fs/promises');
jest.mock('child_process');
jest.mock('os');

describe('packFiles', () => {
  test('packing files produces a Gzip', async () => {
    const zip = await packFiles({Dockerfile: 'FROM alpine'});
    expect(zip).toBeInstanceOf(Transform);
    expect(zip).toHaveProperty('bytesWritten', expect.any(Number));
    expect(zip).toHaveProperty('close', expect.any(Function));
    expect(zip).toHaveProperty('flush', expect.any(Function));
  });
});

describe('isURL', () => {
  test('returns true for an http url', () => {
    expect(isURL('https://example.com')).toBeTruthy();
  });

  test('returns false for a unix filesystem path', () => {
    expect(isURL('/path/to/file')).toBeFalsy();
  });

  test('returns false for a windows filesystem path', () => {
    expect(isURL('C:\\Path\\To\\File')).toBeFalsy();
  });

  test('returns false for null input', () => {
    expect(isURL(undefined)).toBeFalsy();
  });
});

describe('makeTemporaryFolder', () => {
  beforeAll(() => {
    (tmpdir as jest.Mock).mockReturnValue('/test-temp');
    (mkdtemp as jest.Mock).mockImplementation(async (path) => path);
  });

  describe('when no prefix is set', () => {
    let temporaryFolder: string;
    beforeAll(async () => {
      temporaryFolder = await makeTemporaryFolder();
    });

    test('calls tmpdir', () => {
      expect(tmpdir).toHaveBeenCalledWith();
    });
    test('calls mkdtemp', () => {
      expect(mkdtemp).toHaveBeenCalledWith('/test-temp');
    });
    test('returns a temporary folder', () => {
      expect(temporaryFolder).toBe('/test-temp');
    });
  });

  describe('when a prefix is set', () => {
    let temporaryFolder: string;
    beforeAll(async () => {
      temporaryFolder = await makeTemporaryFolder('prefix');
    });

    test('calls tmpdir', () => {
      expect(tmpdir).toHaveBeenCalledWith();
    });
    test('calls mkdtemp', () => {
      expect(mkdtemp).toHaveBeenCalledWith('/test-temp/prefix');
    });
    test('returns a temporary folder', () => {
      expect(temporaryFolder).toBe('/test-temp/prefix');
    });
  });
});

describe('loadScannerModule', () => {
  beforeAll(async () => {
    (exec as unknown as jest.Mock).mockImplementation((command, options, callback) => {
      callback(null, {stdout: ''});
    });
    await loadScannerModule('test');
  });
  test('runs npm root against the scanner module', () => {
    expect(exec).toHaveBeenCalledWith(
      'npm root -g',
      {cwd: expect.stringContaining('continuous-security/application')},
      expect.any(Function),
    );
  });
  test('uses non-webpack require to load default module', () => {
    expect(__non_webpack_require__).toHaveBeenCalledWith('/test/build/main.js');
  });
});
