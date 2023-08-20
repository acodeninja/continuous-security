import {packFiles} from './PackFiles';
import {Transform} from 'stream';

describe('packFiles', () => {
  test('packing files produces a Gzip', async () => {
    const zip = await packFiles({Dockerfile: 'FROM alpine'});
    expect(zip).toBeInstanceOf(Transform);
    expect(zip).toHaveProperty('bytesWritten', expect.any(Number));
    expect(zip).toHaveProperty('close', expect.any(Function));
    expect(zip).toHaveProperty('flush', expect.any(Function));
  });
});
