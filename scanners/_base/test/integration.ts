import {exec, spawn} from 'child_process';
import {basename, resolve} from 'path';
import {promisify} from 'util';
import {chmod, mkdtemp, readdir, readFile} from 'fs/promises';
import {join} from 'path';
import {tmpdir} from 'os';
import {lstatSync} from "fs";

export const setupIntegrationTests = (
  {afterAll, beforeAll, describe, expect, jest, test},
  scanner,
  process,
  exampleCodebase: string,
  reportFormat,
  configuration: Record<string, string> = {},
  outputReportFile = 'report.json',
) => {
  jest.setTimeout(120 * 1000);
  const runningCommands = [];
  let codebasePath: string;
  let temporaryDirectory: string;

  beforeAll(async () => {
    const fixturesPath = resolve(__dirname, '..', '..', '..', 'examples', 'codebases');

    const codebaseFixtures = await readdir(fixturesPath)
      .then(files => files.map(f => resolve(fixturesPath, f)))
      .then(files => files.filter(f => lstatSync(f).isDirectory()))
      .then(files => files.map(path => [
        basename(path),
        {
          path,
          config: require(resolve(path, 'config.json')),
        },
      ])).then(fixtures => Object.fromEntries(fixtures));

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

    const build = await promisify(exec)(`docker buildx build -t integration-test-${scanner.slug}-${exampleCodebase} .`, {
      cwd: resolve(process.cwd(), 'src', 'assets'),
    });

    temporaryDirectory = await mkdtemp(join(tmpdir(), `integration-test-${scanner.slug}-${exampleCodebase}-`));

    await chmod(temporaryDirectory, 0o777);

    const runCommand = [
      'docker run --rm --network host',
      `-v ${codebasePath}:/target`,
      `-v ${temporaryDirectory}:/output`,
    ];

    Object.entries(configuration).forEach(([name, value]) => {
      runCommand.push(`--env "CONFIG_${name.toUpperCase()}=${value}"`);
    });

    const run = await promisify(exec)(
      runCommand.concat([`integration-test-${scanner.slug}-${exampleCodebase}`]).join(' '),
      {cwd: resolve(process.cwd())},
    );

    if (process.env['DEBUG']) console.log({build, run});
  });

  afterAll(async () => {
    runningCommands.forEach(c => c.kill());

    const {stdout: images} = await promisify(exec)([
      'docker images --format="{{.Repository}} {{.ID}}"',
      `grep "integration-test-${scanner.slug}-${exampleCodebase}"`,
      "cut -d' ' -f2",
    ].join(' | '));

    const foundImages = images.split('\n').filter(i => !!i);

    if (foundImages.length > 0)
      await promisify(exec)(`docker rmi -f ${foundImages.join(' ')}`);

    await promisify(exec)(`rm -rf ${temporaryDirectory}`);
  });

  describe(`running the docker container against a ${exampleCodebase} application`, () => {
    test('creates the output report', async () => {
      await expect(readdir(temporaryDirectory))
        .resolves.toEqual(expect.arrayContaining([outputReportFile]));
    });

    test('the output report can be parsed by the report function', async () => {
      await expect(scanner.report(temporaryDirectory))
        .resolves.toEqual(reportFormat);
    });
  });
};
