import Orchestrator from './Orchestrator';
import {access, readFile} from 'fs/promises';
import {exec} from 'child_process';
import {loadScannerModule} from './Helpers';
import {TestScanner} from '../tests/fixtures/Scanner';
import {TerseConfiguration} from '../tests/fixtures/Configuration';
import {TestScanExpectation} from '../tests/fixtures/Scan';

jest.mock('fs/promises', () => ({
  access: jest.fn().mockResolvedValue(null),
  readFile: jest.fn().mockImplementation((file: string) => {
    if (file.indexOf('report') !== -1) {
      return '{"auditReportVersion":2,"vulnerabilities":{"squirrelly":{"name":"squirrelly","severity":"high","isDirect":true,"via":[{"source":1086152,"name":"squirrelly","dependency":"squirrelly","title":"Insecure template handling in Squirrelly","url":"https://github.com/advisories/GHSA-q8j6-pwqx-pm96","severity":"high","cwe":["CWE-200"],"cvss":{"score":8,"vectorString":"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:C/C:H/I:H/A:N"},"range":"<=8.0.8"}],"effects":[],"range":"*","nodes":["node_modules/squirrelly"],"fixAvailable":false}},"metadata":{"vulnerabilities":{"info":0,"low":0,"moderate":0,"high":1,"critical":0,"total":1},"dependencies":{"prod":2,"dev":0,"optional":0,"peer":0,"peerOptional":0,"total":1}}}';
    }
    return Buffer.from(JSON.stringify(TerseConfiguration));
  })
}));

jest.mock('child_process', () => ({
  exec: jest.fn().mockImplementation((_args, _options, callback) => {
    callback();
  }),
}));

jest.mock('./Helpers', () => ({
  makeTemporaryFolder: jest.fn().mockResolvedValue('/tmp/prefix-random'),
  destroyTemporaryFolder: jest.fn(),
  buildImage: jest.fn().mockResolvedValue('image-hash'),
  runImage: jest.fn(),
  loadScannerModule: jest.fn(),
}));

(loadScannerModule as jest.Mock).mockResolvedValue(TestScanner);

describe('Orchestrator', () => {
  describe('Orchestrator.run', () => {
    const orchestrator = new Orchestrator('/test');

    const scannerInstalled = jest.fn();
    orchestrator.emitter.on('scanner:installed', scannerInstalled);
    const scannerLoaded = jest.fn();
    orchestrator.emitter.on('scanner:loaded', scannerLoaded);
    const scanSetupStarted = jest.fn();
    orchestrator.emitter.on('scan:setup:started', scanSetupStarted);
    const scanSetupFinished = jest.fn();
    orchestrator.emitter.on('scan:setup:finished', scanSetupFinished);
    const scanRunStarted = jest.fn();
    orchestrator.emitter.on('scan:run:started', scanRunStarted);
    const scanRunFinished = jest.fn();
    orchestrator.emitter.on('scan:run:finished', scanRunFinished);
    const scanTeardownStarted = jest.fn();
    orchestrator.emitter.on('scan:teardown:started', scanTeardownStarted);
    const scanTeardownFinished = jest.fn();
    orchestrator.emitter.on('scan:teardown:finished', scanTeardownFinished);

    beforeAll(async () => {
      await orchestrator.run();
    });

    test('loads the configuration from the target project', () => {
      expect(access).toHaveBeenCalledWith('/test/continuous-security.json');
      expect(readFile).toHaveBeenCalledWith('/test/continuous-security.json');
      expect(orchestrator.configuration).toHaveProperty('scanners');
    });

    test('installs scanner modules', () => {
      expect(exec).toHaveBeenCalledWith('npm install -g test-scanner', {cwd: process.cwd()}, expect.any(Function));
      expect(scannerInstalled).toHaveBeenCalledWith('test-scanner');
    });

    test('loads scanner modules', () => {
      expect(loadScannerModule).toHaveBeenCalledWith('test-scanner');
      expect(scannerLoaded).toHaveBeenCalledWith(TestScanner.name);
    });

    test('sets up test scanner', () => {
      expect(scanSetupStarted).toHaveBeenCalledWith(TestScanExpectation.scanner.name);
      expect(scanSetupFinished).toHaveBeenCalledWith(TestScanExpectation.scanner.name);
    });

    test('runs test scanner', () => {
      expect(scanRunStarted).toHaveBeenCalledWith(TestScanExpectation.scanner.name);
      expect(scanRunFinished).toHaveBeenCalledWith(TestScanExpectation.scanner.name, expect.anything());
    });
  });
});
