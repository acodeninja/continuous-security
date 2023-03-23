import EventEmitter2 from 'eventemitter2';

export class Emitter implements EventEmitter {
  private eventEmitter: EventEmitter2;

  constructor() {
    this.eventEmitter = new EventEmitter2({wildcard: true});
  }

  emit(event: string, ...values: Array<unknown>): void {
    this.eventEmitter.emit(event, ...values);
  }

  on(event: string, listener: (...values: Array<unknown>) => void): void {
    this.eventEmitter.on(event, listener);
  }
}
