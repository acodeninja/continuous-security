import {pack} from 'tar-stream';
import {createGzip} from 'zlib';

export const packFiles = async (files: ScannerBuildConfiguration['files']) => {
  const tarPack = pack();

  Object.entries(files).forEach(([name, contents]) => {
    tarPack.entry({name}, contents);
  });

  tarPack.finalize();

  return tarPack.pipe(createGzip());
};
