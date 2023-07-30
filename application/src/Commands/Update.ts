import axios from 'axios';
import {exec} from 'child_process';
import {promisify} from 'util';

import packageJson from '../../package.json';

import {Command} from 'commander';
import {Emitter} from '../Emitter';
import {Logger} from '../Logger';

const emitter = new Emitter();
new Logger(emitter);

export const UpdateCommand = (program: Command) => {
  program.command('update')
    .description('Update to the latest version of continuous-security')
    .action(async () => {
      emitter.emit('update', `Current version is ${packageJson.version}`);

      const {data: {version: latestVersion}} =
        await axios.get('https://registry.npmjs.org/@continuous-security/application/latest');

      emitter.emit('update', `Latest version is ${latestVersion}`);

      if (packageJson.version < latestVersion) {
        emitter.emit('update:updating', 'Latest version is higher');

        try {
          await promisify(exec)(`npm i -g @continuous-security/application@${latestVersion}`);
        } catch (e) {
          emitter.emit('update:error', `Failed to update ${e}`);
        }

        emitter.emit('update:updated', 'Updated to latest version');
      } else {
        emitter.emit('update:ignoring', 'Current version is up to date');
      }
    });
};
