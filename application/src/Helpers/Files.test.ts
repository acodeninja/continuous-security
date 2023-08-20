import {tmpdir} from 'os';
import {mkdtemp, rm} from 'fs/promises';
import {destroyTemporaryFolder, makeTemporaryFolder} from './Files';

jest.mock('fs/promises');
jest.mock('fs');
jest.mock('child_process');
jest.mock('os');

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

describe('destroyTemporaryFolder', () => {
  test('calls rm with the folder path', async () => {
    await destroyTemporaryFolder('/test/folder');
    expect(rm).toHaveBeenCalledWith('/test/folder', {force: true, recursive: true});
  });
});
