import {jest, describe, test, expect} from '@jest/globals';

jest.unstable_mockModule('child_process', () => ({
  exec: jest.fn(),
}));

const {exec} = await import('child_process');
const {executed} = await import('./Processes');

describe('executed', () => {
  describe('successful execution', () => {
    test('returns true', async () => {
      (exec as unknown as jest.Mock<any>).mockImplementationOnce((_c, _o, callback) => {
        callback(null, '', '');
      });

      await expect(executed('echo succeed')).resolves.toEqual(true);
      expect(exec).toHaveBeenCalledWith('echo succeed', {env: process.env}, expect.any(Function));
    });
  });
  describe('unsuccessful execution', () => {
    test('returns false', async () => {
      (exec as unknown as jest.Mock<any>).mockImplementationOnce((_c, _o, callback) => {
        callback(new Error, '', '');
      });

      await expect(executed('echo fail')).resolves.toEqual(false);
      expect(exec).toHaveBeenCalledWith('echo fail', {env: process.env}, expect.any(Function));
    });
  });
});
