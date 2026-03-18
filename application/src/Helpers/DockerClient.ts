import Docker from 'dockerode';
import {join} from 'path';

import {getDockerSocketPath} from './DockerSocket';
import {createWriteStream} from 'fs';
import {isURL} from './Strings';
import {packFiles} from './PackFiles';

export const extractImageHash = (result: Array<Record<string, unknown>>): string | undefined => {
  const auxEntry = result.find(r => !!r.aux);
  if (auxEntry) {
    return (auxEntry.aux as {ID: string}).ID.replace(/^sha256:/, '');
  }

  const builtEntry = result.find(
    r => typeof r.stream === 'string' && r.stream.startsWith('Successfully built '),
  );
  if (builtEntry) {
    return (builtEntry.stream as string).replace('Successfully built ', '').trim();
  }

  const sha256Match = result
    .map(r => typeof r.stream === 'string' ? r.stream : '')
    .join('')
    .match(/sha256:([a-f0-9]+)/);
  if (sha256Match) {
    return sha256Match[1];
  }

  return undefined;
};

export const buildImage = async (buildConfiguration: ScannerBuildConfiguration):
  Promise<string> => {
  const packedFiles = await packFiles(buildConfiguration.files);

  const docker = new Docker({
    socketPath: await getDockerSocketPath(),
  });

  const builder = await docker.buildImage(packedFiles);

  return await new Promise((resolve, reject) => {
    docker.modem.followProgress(
      builder,
      (error, result) => {
        if (error) return reject(error);
        const buildError = result.find(r => !!r.error);
        if (buildError) return reject(new Error(buildError.error as string));
        resolve(extractImageHash(result));
      },
    );
  });
};

export const runImage = async (runConfiguration: ScannerRunConfiguration) => {
  const log = createWriteStream(join(runConfiguration.volumes.output, 'output.log'));

  if (!runConfiguration.imageHash) throw new Error('No image hash found.');

  const docker = new Docker({
    socketPath: await getDockerSocketPath(),
  });

  const binds = Object.entries(runConfiguration.volumes)
    .filter(entry => !isURL(entry[1]))
    .map(([container, host]) => `${host}:/${container}`);

  await docker.run(runConfiguration.imageHash, [], [log, log], {
    Cmd: runConfiguration.command || [],
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
