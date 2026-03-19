import {jest, describe, test, expect, beforeAll} from '@jest/globals';

jest.unstable_mockModule('child_process', () => ({
  exec: jest.fn(),
}));
jest.unstable_mockModule('os', () => ({}));

const {exec} = await import('child_process');
const {loadScannerModule} = await import('./ScannerLoader');

describe('loadScannerModule', () => {
  beforeAll(async () => {
    (exec as unknown as jest.Mock<any>).mockImplementation((command, options, callback) => {
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
