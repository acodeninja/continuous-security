import {buildImage, makeTemporaryFolder, destroyTemporaryFolder, runImage} from './Helpers';

export class ValidationError extends Error {

}

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
    this.emitter.emit('scanner:setup:started', this.scanner.name);

    if (this.scanner.runConfiguration) {
      Object.entries(this.scanner.runConfiguration).forEach(([name, validation]) => {
        if (validation.required) {
          if (!this.configuration?.with?.[name]) {
            this.emitter.emit(
              'scanner:setup:error',
              this.scanner.name,
              `Property with.${name} is required`,
            );
            throw new ValidationError(`Property with.${name} is required`);
          }
        }
      });
    }

    this.imageHash = await buildImage(this.scanner.buildConfiguration);
    this.output = await makeTemporaryFolder(`${this.scanner.slug}-`);

    if (process.env.DEBUG) {
      this.emitter.emit('debug', `${this.scanner.name} output at ${this.output}`);
    }

    this.emitter.emit('scanner:setup:finished', this.scanner.name);

    return this;
  }

  async run() {
    this.emitter.emit('scanner:run:started', this.scanner.name);

    if (!this.imageHash) throw new Error('imageHash not found');
    if (!this.output) throw new Error('output directory not found');

    await runImage({
      configuration: this.configuration.with,
      imageHash: this.imageHash,
      host: {
        output: this.output,
        target: process.cwd(),
      },
    });

    this.report = await this.scanner.report(this.output);

    this.emitter.emit('scanner:run:finished', this.scanner.name, this.report);

    return this;
  }

  async teardown() {
    this.emitter.emit('scanner:teardown:started', this.scanner.name);

    if (!this.output) throw new Error('output directory not found');

    if (!process.env.DEBUG) await destroyTemporaryFolder(this.output);

    this.emitter.emit('scanner:teardown:finished', this.scanner.name);

    return this;
  }
}
