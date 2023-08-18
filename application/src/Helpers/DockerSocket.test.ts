import {access, constants} from 'fs/promises';
import {getDockerSocketPath} from './DockerSocket';

jest.mock('fs/promises');

describe('getDockerSocketPath', () => {
  describe('when using docker desktop',  () => {
    let socketPath: string;

    beforeAll(async () => {
      (access as jest.Mock).mockImplementation(async (file, _) => {
        if (file === '/var/run/docker.sock') return null;
        throw new Error('file does not exist');
      });
      socketPath = await getDockerSocketPath();
    });


    test('returns /var/run/docker.sock', () => {
      expect(socketPath).toEqual('/var/run/docker.sock');
    });

    test('checks if /var/run/docker.sock permissions are correct', () => {
      expect(access as jest.Mock)
        .toHaveBeenCalledWith('/var/run/docker.sock', constants.R_OK | constants.W_OK);
    });
  });

  describe('when using rancher desktop',  () => {
    const oldHome = process.env['HOME'];
    let socketPath: string;

    beforeAll(async () => {
      process.env['HOME'] = '/home/test-user';
      (access as jest.Mock).mockImplementation(async (file, _) => {
        if (file === '/home/test-user/.rd/docker.sock') return null;
        throw new Error('file does not exist');
      });
      socketPath = await getDockerSocketPath();
    });

    afterAll(() => {
      process.env['HOME'] = oldHome;
    });


    test('returns /home/test-user/.rd/docker.sock', () => {
      expect(socketPath).toEqual('/home/test-user/.rd/docker.sock');
    });

    test('checks if /home/test-user/.rd/docker.sock permissions are correct', () => {
      expect(access as jest.Mock)
        .toHaveBeenCalledWith('/home/test-user/.rd/docker.sock', constants.R_OK | constants.W_OK);
    });
  });


  describe('when no docker socket is available',  () => {
    const oldHome = process.env['HOME'];
    beforeAll(async () => {
      process.env['HOME'] = '/home/test-user';
      (access as jest.Mock).mockImplementation(async () => {
        throw new Error('file does not exist');
      });
    });

    afterAll(() => {
      process.env['HOME'] = oldHome;
    });

    test('throws an exception showing which paths were checked', async () => {
      await expect(getDockerSocketPath).rejects.toThrow(
        'Docker socket is not readable, tried ' +
        '/var/run/docker.sock, ' +
        '/home/test-user/.rd/docker.sock',
      );
    });
  });
});
