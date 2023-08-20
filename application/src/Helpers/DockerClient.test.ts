import Docker from 'dockerode';
import {Readable} from 'stream';
import Modem from 'docker-modem';
import {buildImage, runImage} from './DockerClient';
import {getDockerSocketPath} from './DockerSocket';
import {createWriteStream} from 'fs';

jest.mock('fs');
jest.mock('./DockerSocket');

(getDockerSocketPath as jest.Mock).mockResolvedValue('/var/run/docker.sock');

describe('buildImage', () => {
  const dockerBuildImage = jest.spyOn(Docker.prototype, 'buildImage');
  dockerBuildImage.mockResolvedValue(new Readable());

  describe('when no error occurs', () => {
    const followProgress = jest.spyOn(Modem.prototype, 'followProgress');
    followProgress.mockImplementationOnce((builder, onFinish) => {
      onFinish(null, [{}]);
      onFinish(null, [{aux: {ID: 'test-image'}}]);
    });

    beforeAll(async () => {
      await buildImage({
        files: {Dockerfile: 'FROM alpine'},
      });
    });

    test('Docker.buildImage was called', () => {
      expect(dockerBuildImage).toHaveBeenCalledWith(expect.any(Readable), {});
    });

    test('Modem.followProgress was called', () => {
      expect(followProgress).toHaveBeenCalledWith(expect.any(Readable), expect.any(Function));
    });
  });

  describe('when an error occurs', () => {
    const followProgress = jest.spyOn(Modem.prototype, 'followProgress');
    followProgress.mockImplementationOnce((builder, onFinish) => {
      onFinish(new Error('test error'), []);
    });

    test('raises the error', async () => {
      await expect(buildImage({files: {Dockerfile: 'FROM alpine'}})).rejects.toThrow('test error');
    });

    test('Docker.buildImage was called', () => {
      expect(dockerBuildImage).toHaveBeenCalledWith(expect.any(Readable), {});
    });

    test('Modem.followProgress was called', () => {
      expect(followProgress).toHaveBeenCalledWith(expect.any(Readable), expect.any(Function));
    });
  });
});

describe('runImage', () => {
  const runMock = jest.spyOn(Docker.prototype, 'run');
  runMock.mockResolvedValue(null);

  describe('without image hash', () => {
    test('raises a "No image hash found." error', async () => {
      await expect(runImage({
        imageHash: undefined,
        volumes: {
          target: '/target',
          output: '/output',
        },
      })).rejects.toThrow('No image hash found.');
    });
  });

  describe('without configuration', () => {
    beforeAll(async () => {
      await runImage({
        imageHash: 'test',
        volumes: {
          target: '/target',
          output: '/output',
        },
      });
    });

    test('createWriteSteam call with output path', () => {
      expect(createWriteStream).toHaveBeenCalledWith('/output/output.log');
    });

    test('Docker.run was called', () => {
      expect(runMock).toHaveBeenCalledWith(
        'test',
        [],
        [undefined, undefined],
        {
          Env: [],
          HostConfig: {
            AutoRemove: true,
            Binds: ['/target:/target', '/output:/output'],
            NetworkMode: 'host',
          },
          Tty: false,
          Cmd: [],
        },
      );
    });
  });

  describe('with configuration', () => {
    beforeAll(async () => {
      await runImage({
        configuration: {
          input: 'test',
        },
        imageHash: 'test',
        volumes: {
          target: '/target',
          output: '/output',
        },
      });
    });

    test('createWriteSteam call with output path', () => {
      expect(createWriteStream).toHaveBeenCalledWith('/output/output.log');
    });

    test('Docker.run was called', () => {
      expect(runMock).toHaveBeenCalledWith(
        'test',
        [],
        [undefined, undefined],
        {
          Env: ['CONFIG_INPUT=test'],
          HostConfig: {
            AutoRemove: true,
            Binds: ['/target:/target', '/output:/output'],
            NetworkMode: 'host',
          },
          Cmd: [],
          Tty: false,
        },
      );
    });
  });
});
