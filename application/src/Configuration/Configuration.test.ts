import {access} from 'fs/promises';
import {Configuration, ConfigurationLoadError} from './Configuration';

jest.mock('fs/promises', () => ({
  access: jest.fn(),
}));

describe('Configuration', () => {
  describe('Configuration.load', () => {
    describe('a non-existent configuration file', () => {
      beforeAll(() => {
        (access as jest.Mock).mockRejectedValueOnce(new Error('File does not exist'));
      });

      test('throws a ConfigurationLoadError', async () => {
        await expect(Configuration.load('/test'))
          .rejects.toThrow(ConfigurationLoadError);
      });
    });
  });
});
