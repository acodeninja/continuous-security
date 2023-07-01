import {Command} from 'commander';

import packageJson from '../package.json';

import {ScanCommand} from './Commands/Scan';
import {InitialiseCommand} from './Commands/Initialise';

const program = new Command();

program.name('continuous-security')
  .description(packageJson.description)
  .version(packageJson.version)
  .showHelpAfterError(true);

ScanCommand(program);
InitialiseCommand(program);

program.parse();
