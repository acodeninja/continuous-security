import {exec} from "child_process";
import {resolve} from "path";
import {promisify} from "util";
import {mkdtemp, readdir} from "fs/promises";
import {join} from "path";
import {tmpdir} from "os";
import scanner from "../src/main";

jest.setTimeout(60 * 1000);

describe('building the docker image', () => {
  test('successfully builds the image', async () => {
    await expect(promisify(exec)('docker buildx build -t scanner-npm-audit-test .', {
      cwd: resolve(process.cwd(), 'src', 'assets'),
    })).resolves.toEqual(expect.objectContaining({
      stderr: expect.stringContaining("docker.io/library/scanner-npm-audit-test done"),
    }));
  });
});

describe('running the docker container', () => {
  let temporaryDirectory;

  beforeAll(async () => {
    await promisify(exec)('docker buildx build -t scanner-npm-audit-test .', {
      cwd: resolve(process.cwd(), 'src', 'assets'),
    });

    temporaryDirectory = await mkdtemp(join(tmpdir(), 'scanner-npm-audit-integration-test'));

    await promisify(exec)(
      [
        'docker run',
        `-v ${resolve(process.cwd(), '..', '..', 'examples', 'nodejs')}:/target`,
        `-v ${temporaryDirectory}:/output`,
        'scanner-npm-audit-test'
      ].join(' '),
      {cwd: resolve(process.cwd())},
    );
  });

  afterAll(async () => {
    await promisify(exec)(`rm -rf ${temporaryDirectory}`);
  });

  test('creates the output report', async () => {
    await expect(readdir(temporaryDirectory))
      .resolves.toEqual(expect.arrayContaining(['report.json']));
  });

  test('the output report can be parsed by the report function', async () => {
    await expect(scanner.report(temporaryDirectory))
      .resolves.toEqual({
        counts: {
          critical: 0,
          high: 1,
          info: 0,
          low: 0,
          moderate: 0,
          total: 1,
          unknown: 0,
        },
        issues: [
          {
            cwe: ["200"],
            description: "Insecure template handling in Squirrelly",
            fix: "Unknown",
            package: "squirrelly",
            severity: "high",
            title: "Vulnerable Third-Party Library `squirrelly`",
            type: "dependency",
          },
        ],
        scanner: "@continuous-security/scanner-npm-audit",
      });
  });
});
