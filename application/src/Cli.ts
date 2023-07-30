import {Command} from 'commander';

import packageJson from '../package.json';

import {InitialiseCommand} from './Commands/Initialise';
import {ScanCommand} from './Commands/Scan';
import {UpdateCommand} from './Commands/Update';

const program = new Command();

program.name('continuous-security')
  .description(packageJson.description)
  .version(packageJson.version)
  .showHelpAfterError(true);

ScanCommand(program);
InitialiseCommand(program);
UpdateCommand(program);

program.parse();
