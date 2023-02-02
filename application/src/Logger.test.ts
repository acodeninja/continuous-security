import {Logger} from './Logger';
import Emitter from './Emitter';

const consoleLog = jest.fn();
const backupConsoleLog = console.log;

beforeAll(() => {
  console.log = consoleLog;
});
afterAll(() => {
  console.log = backupConsoleLog;
});

describe('ci logger', () => {
  const emitter = new Emitter();
  new Logger(emitter, 'ci');

  beforeAll(() => {
    emitter.emit('event', 'name');
  });

  test('logs a triggered event', () => {
    expect(console.log).toHaveBeenCalledWith('[event] name');
  });
});
