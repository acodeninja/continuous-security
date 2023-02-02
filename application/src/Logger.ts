import Emitter from './Emitter';

export class Logger {
  private readonly emitter: Emitter;
  private readonly type: 'ci' | 'tty';

  constructor(emitter: Emitter, type?: 'ci' | 'tty') {
    this.emitter = emitter;
    this.type = type ?? 'tty';

    this.emitter.on('*', ((logger: Logger): EventListener => function (...args) {
      logger.log(this.event, args);
    })(this));
  }

  log(event: string, args: Event[]) {
    const [name] = args;

    switch (this.type) {
    case 'ci':
      console.log(`[${event}] ${name}`);
      break;
    case 'tty':
      console.log(`[${event}] ${name}`);
      break;
    }
  }
}
