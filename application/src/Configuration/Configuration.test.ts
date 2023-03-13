import {access, readFile} from 'fs/promises';
import {Configuration, ConfigurationLoadError} from './Configuration';
import {JSONConfiguration} from '../../tests/fixtures/Configuration';

jest.mock('fs/promises', () => ({
  access: jest.fn(),
  readFile: jest.fn(),
}));

describe('Configuration', () => {
  describe('Configuration.load', () => {
    describe('JSON configuration file', () => {
      let configuration: Configuration;
      beforeAll(async () => {
        (access as jest.Mock).mockResolvedValueOnce(null);
        (readFile as jest.Mock).mockResolvedValueOnce(Buffer.from(JSONConfiguration));
        configuration = await Configuration.load('/test');
      });

      test('attempts to read from .continuous-security.json', () => {
        expect(access).toHaveBeenCalledWith('/test/.continuous-security.json');
        expect(readFile).toHaveBeenCalledWith('/test/.continuous-security.json');
      });

      test('loads a list of scanners', () => {
        expect(configuration).toHaveProperty('scanners', [
          {name: 'test-scanner'},
        ]);
      });
    });

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
