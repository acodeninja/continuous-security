import {buildImage, makeTemporaryFolder, destroyTemporaryFolder, runImage} from './Helpers';

export class Scan {
  private readonly configuration: ScannerConfiguration;
  private readonly emitter: EventEmitter;
  private output?: string;
  private imageHash?: string;
  public report?: ScanReport;
  public readonly scanner: Scanner;

  constructor(emitter: EventEmitter, scanner: Scanner, configuration: ScannerConfiguration) {
    this.emitter = emitter;
    this.scanner = scanner;
    this.configuration = configuration;
  }

  async setup() {
    this.emitter.emit('scan:setup:started', this.scanner.name);

    if (this.scanner.validate) await this.scanner.validate(this.configuration);

    this.imageHash = await buildImage(this.scanner.buildConfiguration);
    this.output = await makeTemporaryFolder(`${this.scanner.slug}-`);

    if (process.env.DEBUG) this.emitter.emit('debug', `${this.scanner.name} output at ${this.output}`);

    this.emitter.emit('scan:setup:finished', this.scanner.name);

    return this;
  }

  async run() {
    this.emitter.emit('scan:run:started', this.scanner.name);

    if (!this.imageHash) throw new Error('imageHash not found');
    if (!this.output) throw new Error('output directory not found');

    await runImage({
      imageHash: this.imageHash,
      host: {
        output: this.output,
        target: process.cwd(),
      },
    });

    this.report = await this.scanner.report(this.output);

    this.emitter.emit('scan:run:finished', this.scanner.name, this.report);

    return this;
  }

  async teardown() {
    this.emitter.emit('scan:teardown:started', this.scanner.name);

    if (!this.output) throw new Error('output directory not found');

    await destroyTemporaryFolder(this.output);

    this.emitter.emit('scan:teardown:finished', this.scanner.name);

    return this;
  }
}
