import {access, constants} from 'fs/promises';

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
