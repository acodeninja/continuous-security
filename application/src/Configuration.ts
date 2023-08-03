import {access, readFile} from 'fs/promises';
import {resolve} from 'path';
import {parse as YamlParse} from 'yaml';

export class ConfigurationLoadError extends Error {
  override message = 'Failed to load configuration file: ';
  constructor(message) {
    super();
    this.message += message;
  }
}

export class Configuration {
  public readonly ignore: Array<string>;
  public readonly scanners: Array<ScannerConfiguration>;

  constructor({scanners, ignore}: ConfigurationFile) {
    this.ignore = ignore;
    this.scanners = scanners.map(scanner =>
      typeof scanner === 'string' ? {name: scanner} : scanner);
  }

  /**
   * @param path
   * @throws ConfigurationLoadError
   */
  static async load(path: string): Promise<Configuration> {
    const filePath = (await Promise.all(
      ['json', 'yaml', 'yml']
        .map(ext => resolve(path, '.continuous-security.' + ext))
        .map(file => access(file).then(() => file).catch(() => null)),
    )).find(file => !!file);

    try {
      const fileContents = (await readFile(filePath)).toString('utf8');

      if (filePath.endsWith('.json'))
        return new Configuration(JSON.parse(fileContents));

      if (filePath.endsWith('.yaml') || filePath.endsWith('.yml'))
        return new Configuration(YamlParse(fileContents));

    } catch (e) {
      throw new ConfigurationLoadError(e.message);
    }
  }
}
