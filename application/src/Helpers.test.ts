import {
  buildImage,
  destroyTemporaryFolder,
  getDockerSocketPath,
  isURL,
  loadScannerModule,
  makeTemporaryFolder,
  packFiles,
  runImage,
} from './Helpers';
import {tmpdir} from 'os';
import {access, constants, mkdtemp, rm} from 'fs/promises';
import {Transform, Readable} from 'stream';
import {exec} from 'child_process';
import Docker from 'dockerode';
import Modem from 'docker-modem';
import {createWriteStream} from 'fs';

jest.mock('fs/promises');
jest.mock('fs');
jest.mock('child_process');
jest.mock('os');

describe('packFiles', () => {
  test('packing files produces a Gzip', async () => {
    const zip = await packFiles({Dockerfile: 'FROM alpine'});
    expect(zip).toBeInstanceOf(Transform);
    expect(zip).toHaveProperty('bytesWritten', expect.any(Number));
    expect(zip).toHaveProperty('close', expect.any(Function));
    expect(zip).toHaveProperty('flush', expect.any(Function));
  });
});

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
        host: {
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
        host: {
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
            Binds: ['/output:/output', '/target:/target'],
            NetworkMode: 'host',
          },
          Tty: false,
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
        host: {
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
            Binds: ['/output:/output', '/target:/target'],
            NetworkMode: 'host',
          },
          Tty: false,
        },
      );
    });
  });
});

describe('isURL', () => {
  test('returns true for an http url', () => {
    expect(isURL('https://example.com')).toBeTruthy();
  });

  test('returns false for a unix filesystem path', () => {
    expect(isURL('/path/to/file')).toBeFalsy();
  });

  test('returns false for a windows filesystem path', () => {
    expect(isURL('C:\\Path\\To\\File')).toBeFalsy();
  });

  test('returns false for null input', () => {
    expect(isURL(undefined)).toBeFalsy();
  });
});

describe('makeTemporaryFolder', () => {
  beforeAll(() => {
    (tmpdir as jest.Mock).mockReturnValue('/test-temp');
    (mkdtemp as jest.Mock).mockImplementation(async (path) => path);
  });

  describe('when no prefix is set', () => {
    let temporaryFolder: string;
    beforeAll(async () => {
      temporaryFolder = await makeTemporaryFolder();
    });

    test('calls tmpdir', () => {
      expect(tmpdir).toHaveBeenCalledWith();
    });
    test('calls mkdtemp', () => {
      expect(mkdtemp).toHaveBeenCalledWith('/test-temp');
    });
    test('returns a temporary folder', () => {
      expect(temporaryFolder).toBe('/test-temp');
    });
  });

  describe('when a prefix is set', () => {
    let temporaryFolder: string;
    beforeAll(async () => {
      temporaryFolder = await makeTemporaryFolder('prefix');
    });

    test('calls tmpdir', () => {
      expect(tmpdir).toHaveBeenCalledWith();
    });
    test('calls mkdtemp', () => {
      expect(mkdtemp).toHaveBeenCalledWith('/test-temp/prefix');
    });
    test('returns a temporary folder', () => {
      expect(temporaryFolder).toBe('/test-temp/prefix');
    });
  });
});

describe('destroyTemporaryFolder', () => {
  test('calls rm with the folder path', async () => {
    await destroyTemporaryFolder('/test/folder');
    expect(rm).toHaveBeenCalledWith('/test/folder', {force: true, recursive: true});
  });
});

describe('loadScannerModule', () => {
  beforeAll(async () => {
    (exec as unknown as jest.Mock).mockImplementation((command, options, callback) => {
      callback(null, {stdout: ''});
    });
    await loadScannerModule('test');
  });
  test('runs npm root against the scanner module', () => {
    expect(exec).toHaveBeenCalledWith(
      'npm root -g',
      {cwd: expect.stringContaining('continuous-security/application')},
      expect.any(Function),
    );
  });
  test('uses non-webpack require to load default module', () => {
    expect(__non_webpack_require__).toHaveBeenCalledWith('/test/build/main.js');
  });
});
