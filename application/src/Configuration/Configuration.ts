import {access} from "fs/promises";

export class ConfigurationLoadError extends Error {
  override message = 'Failed to load configuration file.';
}

export class Configuration {
  /**
   * @param path
   * @throws ConfigurationLoadError
   */
  static async load(path: string) {
    try {
      await access(path);
    } catch (e) {
      throw new ConfigurationLoadError();
    }
  }
}
