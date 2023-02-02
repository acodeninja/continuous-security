import {access, readFile} from 'fs/promises';
import Configuration, {ConfigurationLoadError} from './Configuration';
import {TerseConfiguration, VerboseConfiguration} from '../tests/fixtures/Configuration';

jest.mock('fs/promises', () => ({
  access: jest.fn(),
  readFile: jest.fn(),
}));

describe('Configuration', () => {
  describe('Configuration.load', () => {
    describe.each([
      ['a valid verbose', VerboseConfiguration],
      ['a valid terse', TerseConfiguration],
    ])('%s configuration', (_type: string, configurationInput: ConfigurationFile) => {
      let configuration: Configuration;

      beforeAll(async () => {
        (readFile as jest.Mock).mockResolvedValueOnce(Buffer.from(JSON.stringify(configurationInput)));
        (access as jest.Mock).mockResolvedValueOnce(null);
        configuration = await Configuration.load('/test');
      });

      test('checks if the configuration file exists', () => {
        expect(access).toHaveBeenCalledWith('/test/continuous-security.json');
      });

      test('attempts to load the configuration file', () => {
        expect(readFile).toHaveBeenCalledWith('/test/continuous-security.json');
      });

      test('returns an instantiated Configuration class', () => {
        expect(configuration).toHaveProperty('scanners', [{name: 'test-scanner'}]);
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
