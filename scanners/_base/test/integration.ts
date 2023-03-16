import {exec} from 'child_process';
import {resolve} from 'path';
import {promisify} from 'util';
import {mkdtemp, readdir} from 'fs/promises';
import {join} from 'path';
import {tmpdir} from 'os';

export const setupIntegrationTests = (
  {jest, describe, test, expect, beforeAll, afterAll},
  scanner,
  process,
  exampleCodebase,
  reportFormat,
  outputReportFile = 'report.json',
) => {
  jest.setTimeout(60 * 1000);

  describe('building the docker image', () => {
    test('successfully builds the image', async () => {
      await expect(promisify(exec)(`docker buildx build -t integration-test-${scanner.slug} .`, {
        cwd: resolve(process.cwd(), 'src', 'assets'),
      })).resolves.toEqual(expect.objectContaining({
        stderr: expect.stringContaining(`docker.io/library/integration-test-${scanner.slug} done`),
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

      await promisify(exec)(
        [
          'docker run',
          `-v ${resolve(process.cwd(), '..', '..', 'examples', exampleCodebase)}:/target`,
          `-v ${temporaryDirectory}:/output`,
          `integration-test-${scanner.slug}`,
        ].join(' '),
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

    await promisify(exec)(`docker rm ${containers.split('\n').join(' ')}`);

    const {stdout: images} = await promisify(exec)([
      'docker images --format="{{.Repository}} {{.ID}}"',
      `grep "integration-test-${scanner.slug}"`,
      "cut -d' ' -f2",
    ].join(' | '));

    await promisify(exec)(`docker rmi -f ${images.split('\n').join(' ')}`);
  });
};
