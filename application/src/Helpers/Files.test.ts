import {jest, describe, test, expect, beforeAll} from '@jest/globals';

jest.unstable_mockModule('fs/promises', () => ({
  mkdtemp: jest.fn(),
  rm: jest.fn(),
}));
jest.unstable_mockModule('fs', () => ({}));
jest.unstable_mockModule('child_process', () => ({}));
jest.unstable_mockModule('os', () => ({
  tmpdir: jest.fn(),
}));

const {tmpdir} = await import('os');
const {mkdtemp, rm} = await import('fs/promises');
const {destroyTemporaryFolder, makeTemporaryFolder} = await import('./Files');

describe('makeTemporaryFolder', () => {
  beforeAll(() => {
    (tmpdir as jest.Mock<any>).mockReturnValue('/test-temp');
    (mkdtemp as jest.Mock<any>).mockImplementation(async (path) => path);
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
