import {access, readFile} from 'fs/promises';
import {resolve} from 'path';
import Emitter from './Emitter';

export class ConfigurationLoadError extends Error {
  override message = 'Failed to load configuration file.';
}

export default class Configuration {
  public scanners: Array<ScannerConfiguration> = [];

  constructor(configuration: ConfigurationFile) {
    this.scanners = configuration.scanners.map((scanner): ScannerConfiguration => {
      if (typeof scanner === 'string')
        scanner = {name: scanner};

      return scanner;
    });
  }

  static async load(rootDirectory: string, emitter?: Emitter): Promise<Configuration> {
    const configurationPath = resolve(rootDirectory, 'continuous-security.json');

    return await access(configurationPath)
      .then(() => readFile(configurationPath))
      .then(file => file.toString())
      .then((content): ConfigurationFile => JSON.parse(content))
      .then(configuration => {
        emitter?.emit('configuration:loaded', `path: ${rootDirectory}`);
        return new Configuration(configuration);
      })
      .catch((e) => {
        emitter?.emit('configuration:error', e.toString());
        throw new ConfigurationLoadError();
      });
  }
}
