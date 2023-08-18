import {promisify} from 'util';
import {exec} from 'child_process';

export const loadScannerModule = async (name: string) => {
  const {stdout} = await promisify(exec)('npm root -g', {cwd: process.cwd()});

  return __non_webpack_require__(`${stdout.split('\n')[0]}/${name}/build/main.js`).default;
};
