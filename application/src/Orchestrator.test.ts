import {Orchestrator} from './Orchestrator';
import {access, readFile, writeFile} from 'fs/promises';
import {exec} from 'child_process';
import {loadScannerModule} from './Helpers';
import {TestScanner} from '../tests/fixtures/Scanner';
import {JSONConfigurationWithExtraConfig} from '../tests/fixtures/Configuration';
import {TestScanExpectation} from '../tests/fixtures/Scan';
import {NpmAuditReport} from '../tests/fixtures/NpmAuditReport';

jest.mock('fs/promises', () => ({
  access: jest.fn().mockResolvedValue(null),
  cp: jest.fn().mockResolvedValue(null),
  readFile: jest.fn().mockImplementation((file: string) => {
    if (file.indexOf('report') !== -1) {
      return NpmAuditReport;
    }
    return JSONConfigurationWithExtraConfig;
  }),
  rm: jest.fn().mockResolvedValue(null),
  writeFile: jest.fn(),
}));

jest.mock('child_process', () => ({
  exec: jest.fn().mockImplementation((_args, _options, callback) => {
    callback();
  }),
}));

jest.mock('../package.json', () => ({
  version: '1.2.3',
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
    orchestrator.emitter.on('scanner:setup:started', scanSetupStarted);
    const scanSetupFinished = jest.fn();
    orchestrator.emitter.on('scanner:setup:finished', scanSetupFinished);
    const scanRunStarted = jest.fn();
    orchestrator.emitter.on('scanner:run:started', scanRunStarted);
    const scanRunFinished = jest.fn();
    orchestrator.emitter.on('scanner:run:finished', scanRunFinished);
    const scanTeardownStarted = jest.fn();
    orchestrator.emitter.on('scanner:teardown:started', scanTeardownStarted);
    const scanTeardownFinished = jest.fn();
    orchestrator.emitter.on('scanner:teardown:finished', scanTeardownFinished);

    beforeAll(async () => {
      await orchestrator.run();
    });

    test('loads the configuration from the target project', () => {
      expect(access).toHaveBeenCalledWith('/test/.continuous-security.json');
      expect(readFile).toHaveBeenCalledWith('/test/.continuous-security.json');
    });

    test('installs scanner modules', () => {
      expect(exec).toHaveBeenCalledWith(
        'npm install -g @continuous-security/scanner-test@1.2.3 @another-organisation/scanner-test',
        {cwd: process.cwd()},
        expect.any(Function),
      );
      expect(scannerInstalled).toHaveBeenCalledWith('@continuous-security/scanner-test');
      expect(scannerInstalled).toHaveBeenCalledWith('@another-organisation/scanner-test');
    });

    test('loads scanner modules', () => {
      expect(loadScannerModule).toHaveBeenCalledWith('@continuous-security/scanner-test');
      expect(loadScannerModule).toHaveBeenCalledWith('@another-organisation/scanner-test');
      expect(scannerLoaded).toHaveBeenCalledWith(TestScanner.name);
    });

    test('sets up test scanner', () => {
      expect(scanSetupStarted).toHaveBeenCalledWith(TestScanExpectation.scanner.name);
      expect(scanSetupFinished).toHaveBeenCalledWith(TestScanExpectation.scanner.name);
    });

    test('runs test scanner', () => {
      expect(scanRunStarted).toHaveBeenCalledWith(TestScanExpectation.scanner.name);
      expect(scanRunFinished).toHaveBeenCalledWith(
        TestScanExpectation.scanner.name,
        expect.anything(),
      );
    });
  });

  describe('Orchestrator.writeReport', () => {
    (writeFile as jest.Mock).mockResolvedValue(null);
    const orchestrator = new Orchestrator('/test');

    beforeAll(async () => {
      await orchestrator.run();
    });

    test('json file', async () => {
      await orchestrator.writeReport('/test/output', 'json');

      expect(writeFile).toHaveBeenCalledWith('/test/output/report.json', expect.any(Buffer));
    });

    test('markdown file', async () => {
      await orchestrator.writeReport('/test/output', 'markdown');

      expect(writeFile).toHaveBeenCalledWith('/test/output/report.md', expect.any(Buffer));
    });
  });

  describe('Orchestrator.getIssueCount', () => {
    const orchestrator = new Orchestrator('/test');

    beforeAll(async () => {
      await orchestrator.run();
    });

    test('returns the correct number of issues', async () => {
      expect(await orchestrator.getIssueCount()).toEqual(0);
    });
  });
});
