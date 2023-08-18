import {mkdtemp, rm} from 'fs/promises';
import {join} from 'path';
import {tmpdir} from 'os';

export const makeTemporaryFolder = async (prefix = '') => await mkdtemp(join(tmpdir(), prefix));
export const destroyTemporaryFolder = async (location: string) => await rm(location, {
  recursive: true,
  force: true,
});
