import {access, readFile} from 'fs/promises';
import {resolve} from 'path';

export class ConfigurationLoadError extends Error {
  override message = 'Failed to load configuration file.';
}

export class Configuration {
  public readonly scanners: Array<ScannerConfiguration>;

  constructor({scanners}: ConfigurationFile) {
    this.scanners = scanners.map(scanner => typeof scanner === 'string' ? {name: scanner} : scanner);
  }

  /**
   * @param path
   * @throws ConfigurationLoadError
   */
  static async load(path: string) {
    try {
      await access(resolve(path, '.continuous-security.json'));
      const fileContents = await readFile(resolve(path, '.continuous-security.json'));
      const configuration = JSON.parse(fileContents.toString('utf8'));
      return new Configuration(configuration);
    } catch (e) {
      throw new ConfigurationLoadError();
    }
  }
}
