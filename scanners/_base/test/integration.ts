import {exec, spawn} from 'child_process';
import {resolve} from 'path';
import {promisify} from 'util';
import {chmod, mkdtemp, readdir} from 'fs/promises';
import {join} from 'path';
import {tmpdir} from 'os';

export const setupIntegrationTests = (
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  exampleCodebase,
  reportFormat,
  configuration: Record<string, string> = {},
  outputReportFile = 'report.json',
) => {
  jest.setTimeout(120 * 1000);
  const runningCommands = [];

  beforeAll(async () => {
    const installCommands = {nodejs: 'npm ci'};
    const runCommands = {
      nodejs: {
        command: 'node',
        args: ['app.js'],
      },
    };

    if (installCommands[exampleCodebase])
      await promisify(exec)(
        installCommands[exampleCodebase],
        {cwd: resolve(process.cwd(), '..', '..', 'examples', exampleCodebase)},
      );

    if (runCommands[exampleCodebase]) {
      const runningCommand = spawn(
        runCommands[exampleCodebase].command,
        runCommands[exampleCodebase].args,
        {cwd: resolve(process.cwd(), '..', '..', 'examples', exampleCodebase)},
      );
      runningCommands.push(runningCommand);
    }
  });

  afterAll(async () => {
    runningCommands.forEach(c => c.kill());
  });

  describe('building the docker image', () => {
    test('successfully builds the image', async () => {
      const matchingString = `docker.io/library/integration-test-${scanner.slug} (\\d+\\.\\d+s )?done`;

      await expect(promisify(exec)(`docker buildx build -t integration-test-${scanner.slug} .`, {
        cwd: resolve(process.cwd(), 'src', 'assets'),
      })).resolves.toEqual(expect.objectContaining({
        stderr: expect.stringMatching(new RegExp(matchingString)),
      }));
    });
  });

  describe('running the docker container', () => {
    let temporaryDirectory;

    beforeAll(async () => {
      await promisify(exec)(`docker buildx build -t integration-test-${scanner.slug} .`, {
        cwd: resolve(process.cwd(), 'src', 'assets'),
      });

      temporaryDirectory = await mkdtemp(join(tmpdir(), `integration-test-${scanner.slug}`));

      await chmod(temporaryDirectory, 0o777);

      const runCommand = [
        'docker run --rm --network host',
        `-v ${resolve(process.cwd(), '..', '..', 'examples', exampleCodebase)}:/target`,
        `-v ${temporaryDirectory}:/output`,
      ];

      Object.entries(configuration).forEach(([name, value]) => {
        runCommand.push(`--env "CONFIG_${name.toUpperCase()}=${value}"`);
      });

      await promisify(exec)(
        runCommand.concat([`integration-test-${scanner.slug}`]).join(' '),
        {cwd: resolve(process.cwd())},
      );
    });

    afterAll(async () => {
      await promisify(exec)(`rm -rf ${temporaryDirectory}`);
    });

    test('creates the output report', async () => {
      await expect(readdir(temporaryDirectory))
        .resolves.toEqual(expect.arrayContaining([outputReportFile]));
    });

    test('the output report can be parsed by the report function', async () => {
      await expect(scanner.report(temporaryDirectory))
        .resolves.toEqual(reportFormat);
    });
  });

  afterAll(async () => {
    const {stdout: containers} = await promisify(exec)([
      'docker ps -a --format="{{.Image}} {{.ID}}"',
      `grep "integration-test-${scanner.slug}"`,
      "cut -d' ' -f2",
    ].join(' | '));

    const {stdout: images} = await promisify(exec)([
      'docker images --format="{{.Repository}} {{.ID}}"',
      `grep "integration-test-${scanner.slug}"`,
      "cut -d' ' -f2",
    ].join(' | '));

    await promisify(exec)(`docker rmi -f ${images.split('\n').join(' ')}`);
  });
};
