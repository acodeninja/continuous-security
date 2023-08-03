import {Scan, ValidationError} from './Scan';
import {Emitter} from './Emitter';
import {
  buildImage,
  makeTemporaryFolder,
  destroyTemporaryFolder,
  runImage,
} from './Helpers';
import {resolve} from 'path';
import {NpmAuditReport} from '../tests/fixtures/NpmAuditReport';

const Dockerfile = `FROM node:latest
WORKDIR /target
COPY scan.sh /
RUN npm i -g npm
ENTRYPOINT bash /scan.sh
`;

const scanSh = `#!/usr/bin/env bash
npm audit --json > /output/report.json
chmod 777 /output/report.json
`;

const scanner: Scanner = {
  name: '@continuous-security/scanner-npm-audit',
  slug: 'npm-audit',
  version: '0.0.1',
  buildConfiguration: {
    files: {
      Dockerfile,
      'scan.sh': scanSh,
    },
  },
  report: jest.fn().mockResolvedValue({}),
};

jest.mock('./Helpers', () => ({
  makeTemporaryFolder: jest.fn().mockResolvedValue('/tmp/prefix-random'),
  destroyTemporaryFolder: jest.fn(),
  buildImage: jest.fn().mockResolvedValue('image-hash'),
  runImage: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn().mockResolvedValue(NpmAuditReport),
}));

const processCwd = jest.spyOn(process, 'cwd');
processCwd.mockReturnValue(resolve('..', '..', 'examples', 'nodejs'));

const configuration = {
  name: '@continuous-security/scanner-npm-audit',
  target: '../../examples/nodejs',
};

describe('Scan', () => {
  const emitter = new Emitter();
  const scan = new Scan(emitter, scanner, configuration, process.cwd());

  const onDebug = jest.fn();
  const setupStarted = jest.fn();
  const setupFinished = jest.fn();
  const runStarted = jest.fn();
  const runFinished = jest.fn();
  const teardownStarted = jest.fn();
  const teardownFinished = jest.fn();

  emitter.on('debug', onDebug);
  emitter.on('scanner:setup:started', setupStarted);
  emitter.on('scanner:setup:finished', setupFinished);
  emitter.on('scanner:run:started', runStarted);
  emitter.on('scanner:run:finished', runFinished);
  emitter.on('scanner:teardown:started', teardownStarted);
  emitter.on('scanner:teardown:finished', teardownFinished);

  describe('setup', () => {
    beforeAll(async () => await scan.setup());

    test('emits the scanner:setup:started event', () => {
      expect(setupStarted).toHaveBeenCalledWith(scan.scanner.name);
    });

    test('calls buildImage with the buildConfiguration', () => {
      expect(buildImage).toHaveBeenCalledWith(scanner.buildConfiguration);
    });

    test('calls getTemporaryFolder with the appropriate prefix', () => {
      expect(makeTemporaryFolder).toHaveBeenCalledWith(`${scanner.slug}-`);
    });

    test('emits the scanner:setup:finished event', () => {
      expect(setupFinished).toHaveBeenCalledWith(scan.scanner.name);
    });

    test('does not emit a debug event', () => {
      expect(onDebug).not.toHaveBeenCalled();
    });

    describe('when running in debug mode', () => {
      test('emits a debug event with the temporary directory', async () => {
        process.env['DEBUG'] = 'true';
        const onDebug = jest.fn();
        const emitter = new Emitter();
        const scan = new Scan(emitter, scanner, configuration, process.cwd());
        emitter.on('debug', onDebug);
        await scan.setup();
        expect(onDebug).toHaveBeenCalledWith(
          '@continuous-security/scanner-npm-audit output at /tmp/prefix-random',
        );
        delete process.env['DEBUG'];
      });
    });

    describe('with an invalid required configuration', () => {
      let error;
      const emitter = new Emitter();
      const setupErrored = jest.fn();
      const scan = new Scan(emitter, {
        ...scanner,
        runConfiguration: {
          test: {
            required: true,
          },
        },
      }, {...configuration, with: {}}, process.cwd());
      emitter.on('scanner:setup:error', setupErrored);

      beforeAll(async () => {
        await scan.setup().catch(e => error = e);
      });

      test('emits the scanner:setup:error event', () => {
        expect(setupErrored).toHaveBeenCalledWith(
          '@continuous-security/scanner-npm-audit',
          'Property with.test is required',
        );
      });

      test('raises an error', () => {
        expect(error).toEqual(new ValidationError('Property with.test is required'));
      });
    });

    describe('with an missing required configuration', () => {
      let error;
      const emitter = new Emitter();
      const setupErrored = jest.fn();
      const scan = new Scan(emitter, {
        ...scanner,
        runConfiguration: {
          test: {
            required: true,
          },
        },
      }, configuration, process.cwd());
      emitter.on('scanner:setup:error', setupErrored);

      beforeAll(async () => {
        await scan.setup().catch(e => error = e);
      });

      test('emits the scanner:setup:error event', () => {
        expect(setupErrored).toHaveBeenCalledWith(
          '@continuous-security/scanner-npm-audit',
          'Property with.test is required',
        );
      });

      test('raises an error', () => {
        expect(error).toEqual(new ValidationError('Property with.test is required'));
      });
    });
  });

  describe('run', () => {
    beforeAll(async () => await scan.run());

    test('emits the scanner:run:started event', () => {
      expect(runStarted).toHaveBeenCalledWith(scan.scanner.name);
    });

    test('calls buildImage with the buildConfiguration', () => {
      expect(runImage).toHaveBeenCalledWith({
        imageHash: 'image-hash',
        host: {
          output: '/tmp/prefix-random',
          target: resolve('..', '..', 'examples', 'nodejs'),
        },
      });
    });

    test('emits the scanner:run:finished event', () => {
      expect(runFinished).toHaveBeenCalledWith(scan.scanner.name, {});
    });

    describe('with no image hash', () => {
      test('raises "imageHash not found" error', async () => {
        (buildImage as jest.Mock).mockResolvedValueOnce(undefined);
        const emitter = new Emitter();
        const scan = new Scan(emitter, scanner, configuration, process.cwd());
        await scan.setup();

        await expect(scan.run()).rejects.toThrow('imageHash not found');
      });
    });

    describe('with no temporary directory', () => {
      test('raises "output directory not found" error', async () => {
        (makeTemporaryFolder as jest.Mock).mockResolvedValueOnce(undefined);
        const emitter = new Emitter();
        const scan = new Scan(emitter, scanner, configuration, process.cwd());
        await scan.setup();

        await expect(scan.run()).rejects.toThrow('output directory not found');
      });
    });
  });

  describe('teardown', () => {
    beforeAll(async () => await scan.teardown());

    test('emits the scanner:teardown:started event', () => {
      expect(teardownStarted).toHaveBeenCalledWith(scan.scanner.name);
    });

    test('calls removeTemporaryFolder with the path', () => {
      expect(destroyTemporaryFolder).toHaveBeenCalledWith('/tmp/prefix-random');
    });

    test('emits the scanner:teardown:finished event', () => {
      expect(teardownFinished).toHaveBeenCalledWith(scan.scanner.name);
    });

    describe('where there is no temporary directory', () => {
      test('raises "output directory not found" error', async () => {
        (makeTemporaryFolder as jest.Mock).mockResolvedValueOnce(undefined);
        const emitter = new Emitter();
        const scan = new Scan(emitter, scanner, configuration, process.cwd());
        await scan.setup();

        await expect(scan.teardown()).rejects.toThrow('output directory not found');
      });
    });
  });
});
