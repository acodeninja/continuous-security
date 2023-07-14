#!/usr/bin/env node

const {readdir, writeFile} = require('fs/promises');
const {resolve} = require('path');

readdir(resolve(process.cwd(), '..', 'scanners'))
  .then(l => l.filter(i => i !== '_base'))
  .then(l => Promise.all(l.map(async (name) => {
    const path = resolve(process.cwd(), '..', 'scanners', name, 'package.json');
    const {description, continuousSecurityScanner} = require(path);

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
  ))
  .catch(console.error)
