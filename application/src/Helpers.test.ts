import {isURL, makeTemporaryFolder} from './Helpers';
import {tmpdir} from 'os';
import {mkdtemp} from 'fs/promises';

jest.mock('fs/promises');
jest.mock('os');

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
