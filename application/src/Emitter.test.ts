import {Emitter} from './Emitter';

describe('emitted event', () => {
  test('calls registered listeners', () => {
    const listener = jest.fn();
    const emitter = new Emitter();

    emitter.on('event', listener);
    emitter.emit('event');

    expect(listener).toHaveBeenCalled();
  });

  test('calls registered listeners correct number of times', () => {
    const listener = jest.fn();
    const emitter = new Emitter();

    emitter.on('event', listener);
    emitter.emit('event');
    emitter.emit('event');
    emitter.emit('event');

    expect(listener).toHaveBeenCalledTimes(3);
  });

  test('passes arguments to the even listener', () => {
    const listener = jest.fn();
    const emitter = new Emitter();

    emitter.on('event', listener);
    emitter.emit('event', 'one', 'two', 'three');

    expect(listener).toHaveBeenCalledWith('one', 'two', 'three');
  });
});
