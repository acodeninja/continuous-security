import {Command} from 'commander';
import {Orchestrator} from '../Orchestrator';
import {Logger} from '../Logger';

const orchestrator = new Orchestrator(process.cwd());
new Logger(orchestrator.emitter);

type ReportFormat = 'markdown' | 'json' | 'html' | 'pdf';

const allValidFormats =
    (input: Array<unknown>): input is Array<ReportFormat> =>
      Array.isArray(input) && input.filter(isValidFormat).length === input.length;

const isValidFormat = (input: unknown): input is ReportFormat =>
  typeof input === 'string' && ['markdown', 'json', 'html', 'pdf'].includes(input);

export const ScanCommand = (program: Command) => {
  program.command('scan')
    .description('Perform a scan')
    .option('--ci', 'Use the CI logger for line by line output.')
    .option(
      '--format  <format...>',
      'Space separated list of report formats (markdown, json, html and pdf).',
      ['markdown'],
    )
    .action(async (options: { ci?: boolean, format?: Array<string> }) => {
      if (!allValidFormats(options.format)) {
        console.log('--format must be a space separated list of markdown, json, html, pdf');
        process.exit(1);
      }

      await orchestrator.run();

      const issueCount = await orchestrator.getIssueCount();

      if (issueCount > 0) {
        for (const thisFormat of options.format) {

          if (isValidFormat(thisFormat)) {
            console.log(`[report:write] writing report in ${thisFormat}`);
            await orchestrator.writeReport(process.cwd(), thisFormat);
          }
        }
        console.log(`Scan found ${issueCount} issues, please check the report(s).`);

        process.exit(1);
      }

      console.log('Scan found no issues, no report to write');
    });
};
