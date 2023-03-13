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
    const filePath = (await Promise.all(
      ['json', 'yaml', 'yml']
        .map(ext => resolve(path, '.continuous-security.' + ext))
        .map(file => access(file).then(() => file).catch(e => null))
    )).find(file => !!file);

    try {
      const fileContents = await readFile(filePath);
      const configuration = JSON.parse(fileContents.toString('utf8'));
      return new Configuration(configuration);
    } catch (e) {
      throw new ConfigurationLoadError();
    }
  }
}
