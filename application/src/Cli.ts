import {Command, InvalidArgumentError} from 'commander';

import {Orchestrator} from './Orchestrator';
import {Logger} from './Logger';

import packageJson from '../package.json';

const program = new Command();
const orchestrator = new Orchestrator(process.cwd());
new Logger(orchestrator.emitter);

const isValidReport = (input: unknown): input is 'markdown' | 'json' =>
  typeof input === 'string' && ['markdown', 'json'].includes(input);

program.name('continuous-security')
  .description(packageJson.description)
  .version(packageJson.version)
  .showHelpAfterError(true);

program.command('scan')
  .description('Perform a scan')
  .option('--ci', 'Use the CI logger for line by line output.')
  .option('--report  <type>', 'The type of report you want the scan to produce.', 'markdown')
  .action(async (options: { ci?: boolean, report?: string }) => {
    if (!isValidReport(options.report))
      throw new InvalidArgumentError('--report must be markdown or json');

    await orchestrator.run();
    await orchestrator.writeReport(process.cwd(), options.report);
  });

program.parse();
