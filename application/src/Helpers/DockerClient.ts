import Docker from 'dockerode';
import {join} from 'path';

import {getDockerSocketPath} from './DockerSocket';
import {createWriteStream} from 'fs';
import {isURL} from './Strings';
import {packFiles} from './PackFiles';

export const buildImage = async (buildConfiguration: ScannerBuildConfiguration):
  Promise<string> => {
  const packedFiles = await packFiles(buildConfiguration.files);

  const docker = new Docker({
    socketPath: await getDockerSocketPath(),
  });

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

  const docker = new Docker({
    socketPath: await getDockerSocketPath(),
  });

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
