import {promisify} from 'util';
import {exec} from 'child_process';

export const executed = async (command: string) =>
  await promisify(exec)(command, {
    env: process.env,
  })
    .then(() => true)
    .catch(() => false);
