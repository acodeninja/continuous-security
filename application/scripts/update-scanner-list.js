#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const {readdir, writeFile, readFile} = require('fs/promises');
const {resolve} = require('path');
/* eslint-enable */

readdir(resolve(process.cwd(), '..', 'scanners'))
  .then(l => l.filter(i => i !== '_base'))
  .then(l => Promise.all(l.map(async (name) => {
    const path = resolve(process.cwd(), '..', 'scanners', name, 'package.json');
    const {description, continuousSecurityScanner} = JSON.parse((await readFile(path)).toString());

    return {
      name,
      description,
      runConfiguration: continuousSecurityScanner?.runConfiguration,
      package: `@continuous-security/${name}`,
    };
  })))
  .then(scanners => ({scanners}))
  .then(scannerData => writeFile(
    resolve(process.cwd(), 'src', 'scanners.json'),
    JSON.stringify(scannerData, null, 2),
  ).then(() => {
    console.log(`Updated scanner list with ${scannerData.scanners.length} scanners`);
  }))
  .catch(console.error);
