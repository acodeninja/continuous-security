import {access, readFile} from 'fs/promises';
import {Configuration, ConfigurationLoadError} from './Configuration';
import {JSONConfiguration, YAMLConfiguration} from '../../tests/fixtures/Configuration';

jest.mock('fs/promises', () => ({
  access: jest.fn(),
  readFile: jest.fn(),
}));

describe('Configuration', () => {
  describe('Configuration.load', () => {
    describe('JSON configuration file', () => {
      let configuration: Configuration;

      beforeAll(async () => {
        (access as jest.Mock).mockImplementation(async file => {
          if (file.endsWith('.json')) return null;
          throw new Error('file does not exist');
        });

        (readFile as jest.Mock).mockResolvedValueOnce(Buffer.from(JSONConfiguration));

        configuration = await Configuration.load('/test');
      });

      afterAll(() => {
        (access as jest.Mock).mockReset();
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
    describe('YAML configuration file', () => {
      let configuration: Configuration;

      beforeAll(async () => {
        (access as jest.Mock).mockImplementation(async file => {
          if (file.endsWith('.yaml')) return null;
          throw new Error('file does not exist');
        });

        (readFile as jest.Mock).mockResolvedValueOnce(Buffer.from(YAMLConfiguration));

        configuration = await Configuration.load('/test');
      });

      afterAll(() => {
        (access as jest.Mock).mockReset();
      });

      test('attempts to read from .continuous-security.yaml', () => {
        expect(access).toHaveBeenCalledWith('/test/.continuous-security.yaml');
        expect(readFile).toHaveBeenCalledWith('/test/.continuous-security.yaml');
      });

      test('loads a list of scanners', () => {
        expect(configuration).toHaveProperty('scanners', [
          {name: 'test-scanner'},
        ]);
      });
    });

    describe('a non-existent configuration file', () => {
      beforeAll(async () => {
        (access as jest.Mock).mockRejectedValue(new Error('File does not exist'));
        await Configuration.load('/test').catch(() => null);
      });

      afterAll(() => {
        (access as jest.Mock).mockReset();
      });

      test('attempts to read from /test/.continuous-security.json', () => {
        expect(access).toHaveBeenCalledWith('/test/.continuous-security.json');
      });

      test('attempts to read from /test/.continuous-security.yaml', () => {
        expect(access).toHaveBeenCalledWith('/test/.continuous-security.yaml');
      });

      test('attempts to read from /test/.continuous-security.yml', () => {
        expect(access).toHaveBeenCalledWith('/test/.continuous-security.yml');
      });

      test('throws a ConfigurationLoadError', async () => {
        await expect(Configuration.load('/test'))
          .rejects.toThrow(ConfigurationLoadError);
      });
    });
  });
});
