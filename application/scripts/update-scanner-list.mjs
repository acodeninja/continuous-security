#!/usr/bin/env node

import {readdir, writeFile, readFile} from 'fs/promises';
import {resolve} from 'path';

readdir(resolve(import.meta.dirname, '..', '..', 'scanners'))
  .then(l => l.filter(i => i !== '_base'))
  .then(l => Promise.all(l.map(async (name) => {
    const path = resolve(import.meta.dirname, '..', '..', 'scanners', name, 'package.json');
    const {description, continuousSecurityScanner} =
      JSON.parse((await readFile(path)).toString());

    return {
      name,
      description,
      runConfiguration: continuousSecurityScanner?.runConfiguration,
      package: `@continuous-security/${name}`,
    };
  })))
  .then(scanners => ({scanners}))
  .then(scannerData => writeFile(
    resolve(import.meta.dirname, '..', 'src', 'scanners.json'),
    JSON.stringify(scannerData, null, 2),
  ).then(() => {
    console.log(`Updated scanner list with ${scannerData.scanners.length} scanners`);
  }))
  .catch(console.error);
