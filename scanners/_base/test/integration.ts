import {exec, spawn} from 'child_process';
import {resolve} from 'path';
import {promisify} from 'util';
import {chmod, mkdtemp, readdir, readFile} from 'fs/promises';
import {join} from 'path';
import {tmpdir} from 'os';
import {lstatSync} from "fs";

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
  let codebasePath;

  beforeAll(async () => {
    const fixturesPath = resolve(__dirname, '..', '..', '..', 'examples', 'codebases');

    const codebaseFixtures = await readdir(fixturesPath)
      .then(files => files.map(f => resolve(fixturesPath, f)))
      .then(files => files.filter(f => lstatSync(f).isDirectory()))
      .then(files => files.map(path => {
        const config = require(resolve(path, 'config.json'));

        return [config.language, {path, ...config}];
      }))
      .then(fixtures => Object.fromEntries(fixtures));

    if (codebaseFixtures[exampleCodebase]) {
      const fixture = codebaseFixtures[exampleCodebase];
      codebasePath = fixture.path;

      if (fixture.commands?.init)
        await promisify(exec)(fixture.commands?.init.flat(2).join(' '), {cwd: fixture.path});

      if (fixture.commands?.start)
        runningCommands.push(spawn(
          fixture.commands?.start[0],
          fixture.commands?.start[1],
          {cwd: fixture.path},
        ));
    }
  });

  describe(`running the docker container against a ${exampleCodebase} application`, () => {
    let temporaryDirectory;

    beforeAll(async () => {
      await promisify(exec)(`docker buildx build -t integration-test-${scanner.slug} .`, {
        cwd: resolve(process.cwd(), 'src', 'assets'),
      });

      temporaryDirectory = await mkdtemp(join(tmpdir(), `integration-test-${scanner.slug}`));

      await chmod(temporaryDirectory, 0o777);

      const runCommand = [
        'docker run --rm --network host',
        `-v ${codebasePath}:/target`,
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
    runningCommands.forEach(c => c.kill());

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

    const foundImages = images.split('\n').filter(i => !!i);

    if (foundImages.length > 0)
      await promisify(exec)(`docker rmi -f ${foundImages.join(' ')}`);
  });
};
