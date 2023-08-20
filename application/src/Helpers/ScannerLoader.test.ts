import {exec} from 'child_process';
import {loadScannerModule} from './ScannerLoader';

jest.mock('child_process');
jest.mock('os');

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
