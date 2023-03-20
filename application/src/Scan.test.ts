import {Scan} from './Scan';
import {Emitter} from './Emitter';
import {
  buildImage,
  makeTemporaryFolder,
  destroyTemporaryFolder,
  runImage
} from './Helpers';
import {resolve} from "path";

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
  validate: jest.fn(),
  report: jest.fn().mockResolvedValue({

  }),
};

jest.mock('./Helpers', () => ({
  makeTemporaryFolder: jest.fn().mockResolvedValue('/tmp/prefix-random'),
  destroyTemporaryFolder: jest.fn(),
  buildImage: jest.fn().mockResolvedValue('image-hash'),
  runImage: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn().mockResolvedValue('{"auditReportVersion":2,"vulnerabilities":{"squirrelly":{"name":"squirrelly","severity":"high","isDirect":true,"via":[{"source":1086152,"name":"squirrelly","dependency":"squirrelly","title":"Insecure template handling in Squirrelly","url":"https://github.com/advisories/GHSA-q8j6-pwqx-pm96","severity":"high","cwe":["CWE-200"],"cvss":{"score":8,"vectorString":"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:C/C:H/I:H/A:N"},"range":"<=8.0.8"}],"effects":[],"range":"*","nodes":["node_modules/squirrelly"],"fixAvailable":false}},"metadata":{"vulnerabilities":{"info":0,"low":0,"moderate":0,"high":1,"critical":0,"total":1},"dependencies":{"prod":2,"dev":0,"optional":0,"peer":0,"peerOptional":0,"total":1}}}'),
}));

const processCwd = jest.spyOn(process, 'cwd');
processCwd.mockReturnValue(resolve('..', '..', 'examples', 'nodejs'));

const configuration = {
  name: '@continuous-security/scanner-npm-audit',
  target: '../../examples/nodejs',
};

describe('Scan', () => {
  const emitter = new Emitter();
  const scan = new Scan(emitter, scanner, configuration);

  const setupStarted = jest.fn();
  const setupFinished = jest.fn();
  const runStarted = jest.fn();
  const runFinished = jest.fn();
  const teardownStarted = jest.fn();
  const teardownFinished = jest.fn();

  emitter.on('scan:setup:started', setupStarted);
  emitter.on('scan:setup:finished', setupFinished);
  emitter.on('scan:run:started', runStarted);
  emitter.on('scan:run:finished', runFinished);
  emitter.on('scan:teardown:started', teardownStarted);
  emitter.on('scan:teardown:finished', teardownFinished);

  describe('setup', () => {
    beforeAll(async () => await scan.setup());

    test('emits the scan:setup:started event', () => {
      expect(setupStarted).toHaveBeenCalledWith(scan.scanner.name);
    });

    test('validates the scan configuration', () => {
      expect(scanner.validate).toHaveBeenCalledWith(configuration);
    });

    test('calls buildImage with the buildConfiguration', () => {
      expect(buildImage).toHaveBeenCalledWith(scanner.buildConfiguration);
    });

    test('calls getTemporaryFolder with the appropriate prefix', () => {
      expect(makeTemporaryFolder).toHaveBeenCalledWith(`${scanner.slug}-`);
    });

    test('emits the scan:setup:finished event', () => {
      expect(setupFinished).toHaveBeenCalledWith(scan.scanner.name);
    });
  });

  describe('run', () => {
    beforeAll(async () => await scan.run());

    test('emits the scan:run:started event', () => {
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

    test('emits the scan:run:finished event', () => {
      expect(runFinished).toHaveBeenCalledWith(scan.scanner.name, {});
    });
  });

  describe('teardown', () => {
    beforeAll(async () => await scan.teardown());

    test('emits the scan:teardown:started event', () => {
      expect(teardownStarted).toHaveBeenCalledWith(scan.scanner.name);
    });

    test('calls removeTemporaryFolder with the path', () => {
      expect(destroyTemporaryFolder).toHaveBeenCalledWith('/tmp/prefix-random');
    });

    test('emits the scan:teardown:finished event', () => {
      expect(teardownFinished).toHaveBeenCalledWith(scan.scanner.name);
    });
  });
});
