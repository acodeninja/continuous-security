import {Command} from 'commander';

import packageJson from '../package.json';

import {ScanCommand} from "./Commands/Scan";

const program = new Command();

program.name('continuous-security')
  .description(packageJson.description)
  .version(packageJson.version)
  .showHelpAfterError(true);

ScanCommand(program);

program.parse();
