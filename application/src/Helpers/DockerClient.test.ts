import {jest, describe, test, expect, beforeAll} from '@jest/globals';
import Docker from 'dockerode';
import {Readable} from 'stream';
import Modem from 'docker-modem';

jest.unstable_mockModule('fs', () => ({
  createWriteStream: jest.fn(),
}));
jest.unstable_mockModule('./DockerSocket', () => ({
  getDockerSocketPath: jest.fn(),
}));

const {createWriteStream} = await import('fs');
const {getDockerSocketPath} = await import('./DockerSocket');
const {buildImage, extractImageHash, runImage} = await import('./DockerClient');

(getDockerSocketPath as jest.Mock<any>).mockResolvedValue('/var/run/docker.sock');

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
      expect(dockerBuildImage).toHaveBeenCalledWith(expect.any(Readable));
    });

    test('Modem.followProgress was called', () => {
      expect(followProgress).toHaveBeenCalledWith(expect.any(Readable), expect.any(Function));
    });
  });

  describe('when using BuildKit builder', () => {
    const followProgress = jest.spyOn(Modem.prototype, 'followProgress');
    followProgress.mockImplementationOnce((builder, onFinish) => {
      onFinish(null, [
        {stream: 'writing image sha256:ab12cd34ef56 done\n'},
      ]);
    });

    let result: string;

    beforeAll(async () => {
      result = await buildImage({
        files: {Dockerfile: 'FROM alpine'},
      });
    });

    test('extracts the image hash', () => {
      expect(result).toBe('ab12cd34ef56');
    });
  });

  describe('when classic builder without aux', () => {
    const followProgress = jest.spyOn(Modem.prototype, 'followProgress');
    followProgress.mockImplementationOnce((builder, onFinish) => {
      onFinish(null, [
        {stream: 'Step 1/2 : FROM alpine\n'},
        {stream: 'Successfully built de78fa90bc12\n'},
      ]);
    });

    let result: string;

    beforeAll(async () => {
      result = await buildImage({
        files: {Dockerfile: 'FROM alpine'},
      });
    });

    test('extracts the image hash', () => {
      expect(result).toBe('de78fa90bc12');
    });
  });

  describe('when the build fails', () => {
    const followProgress = jest.spyOn(Modem.prototype, 'followProgress');
    followProgress.mockImplementationOnce((builder, onFinish) => {
      onFinish(null, [{error: 'The command returned a non-zero code: 100'}]);
    });

    test('rejects with the build error', async () => {
      await expect(buildImage({files: {Dockerfile: 'FROM alpine'}}))
        .rejects.toThrow('The command returned a non-zero code: 100');
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
      expect(dockerBuildImage).toHaveBeenCalledWith(expect.any(Readable));
    });

    test('Modem.followProgress was called', () => {
      expect(followProgress).toHaveBeenCalledWith(expect.any(Readable), expect.any(Function));
    });
  });
});

describe('extractImageHash', () => {
  test('extracts hash from classic builder aux format', () => {
    const result = [{}, {aux: {ID: 'sha256:abc123def456'}}];
    expect(extractImageHash(result)).toBe('abc123def456');
  });

  test('extracts hash from classic builder stream format', () => {
    const result = [
      {stream: 'Step 1/2 : FROM alpine\n'},
      {stream: 'Successfully built abc123def456\n'},
    ];
    expect(extractImageHash(result)).toBe('abc123def456');
  });

  test('extracts hash from BuildKit stream format', () => {
    const result = [
      {stream: 'writing image sha256:abc123def456789 done\n'},
    ];
    expect(extractImageHash(result)).toBe('abc123def456789');
  });

  test('prefers aux format over stream formats', () => {
    const result = [
      {aux: {ID: 'sha256:aaa111'}},
      {stream: 'Successfully built bbb222\n'},
    ];
    expect(extractImageHash(result)).toBe('aaa111');
  });

  test('returns undefined when no hash is found', () => {
    const result = [{stream: 'some random output\n'}];
    expect(extractImageHash(result)).toBeUndefined();
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
