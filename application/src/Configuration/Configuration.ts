import {access, readFile} from 'fs/promises';
import {resolve} from 'path';
import {load as YamlLoad} from 'js-yaml';

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
        .map(file => access(file).then(() => file).catch(() => null))
    )).find(file => !!file);

    try {
      const fileContents = (await readFile(filePath)).toString('utf8');

      if (filePath.endsWith('.json'))
        return new Configuration(JSON.parse(fileContents));

      if (filePath.endsWith('.yaml'))
        return new Configuration(YamlLoad(fileContents));

    } catch (e) {
      throw new ConfigurationLoadError();
    }
  }
}
