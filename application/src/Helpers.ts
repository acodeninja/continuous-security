import {exec} from 'child_process';
import Docker from 'dockerode';
import {createWriteStream} from 'fs';
import {access, constants, mkdtemp, rm} from 'fs/promises';
import {join} from 'path';
import {tmpdir} from 'os';
import {pack} from 'tar-stream';
import {promisify} from 'util';
import {createGzip} from 'zlib';

export const packFiles = async (files: ScannerBuildConfiguration['files']) => {
  const tarPack = pack();

  Object.entries(files).forEach(([name, contents]) => {
    tarPack.entry({name}, contents);
  });

  tarPack.finalize();

  return tarPack.pipe(createGzip());
};

export const getDockerSocketPath = async (): Promise<string> => {
  const possibleDockerSocketPaths = [
    '/var/run/docker.sock',
    `${process.env['HOME']}/.rd/docker.sock`,
  ];

  const filePath = (await Promise.all(
    possibleDockerSocketPaths.map(file =>
      access(file, constants.R_OK | constants.W_OK)
        .then(() => file)
        .catch(() => null),
    ),
  )).find(file => !!file);

  if (filePath) return filePath;

  throw new Error(`Docker socket is not readable, tried ${possibleDockerSocketPaths.join(', ')}`);
};

export const buildImage = async (buildConfiguration: ScannerBuildConfiguration):
  Promise<string> => {
  const packedFiles = await packFiles(buildConfiguration.files);

  const docker = new Docker();
  const builder = await docker.buildImage(packedFiles, {});

  return await new Promise((resolve, reject) => {
    docker.modem.followProgress(
      builder,
      (error, result) => {
        if (error) return reject(error);
        resolve(result.find(r => !!r.aux)?.aux.ID.split(':')?.[1]);
      },
    );
  });
};

export const runImage = async (runConfiguration: ScannerRunConfiguration) => {
  const log = createWriteStream(join(runConfiguration.host.output, 'output.log'));

  if (!runConfiguration.imageHash) throw new Error('No image hash found.');

  const docker = new Docker();

  const binds = [`${runConfiguration.host.output}:/output`];

  if (!isURL(runConfiguration.host.target)) binds.push(`${runConfiguration.host.target}:/target`);

  await docker.run(runConfiguration.imageHash, [], [log, log], {
    Tty: false,
    HostConfig: {
      AutoRemove: true,
      Binds: binds,
      NetworkMode: 'host',
    },
    Env: Object.entries(runConfiguration.configuration || {})
      .map(([name, value]) => `CONFIG_${name.toUpperCase()}=${value}`),
  });
};
export const isURL = (input: unknown): input is URL => {
  try {
    if (!input) return false;
    const url = new URL(input as string);
    return !!url.protocol && !!url.host;
  } catch (e) {
    return false;
  }
};

export const makeTemporaryFolder = async (prefix = '') => await mkdtemp(join(tmpdir(), prefix));

export const destroyTemporaryFolder = async (location: string) => await rm(location, {
  recursive: true,
  force: true,
});

export const loadScannerModule = async (name: string) => {
  const {stdout} = await promisify(exec)('npm root -g', {cwd: process.cwd()});

  return __non_webpack_require__(`${stdout.split('\n')[0]}/${name}/build/main.js`).default;
};

export const tidyString = (input: string) =>
  input.replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
