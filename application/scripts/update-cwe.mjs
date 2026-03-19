#!/usr/bin/env node

import {createWriteStream} from 'fs';
import {get} from 'https';
import {Parse} from 'unzip-stream';
import {minifyStream} from 'minify-xml';

const url = 'https://cwe.mitre.org/data/xml/cwec_latest.xml.zip';
new Promise((resolve, reject) => {
  get(url, response => {
    response.pipe(Parse())
      .on('entry', (entry) => {
        if (entry.path.indexOf('.xml') !== -1) {
          entry
            .pipe(minifyStream())
            .pipe(createWriteStream('src/assets/cwe.xml'));

          entry.on('close', resolve);
          entry.on('error', reject);
        } else {
          entry.autodrain();
        }
      });
  });
}).then(() => {
  console.log('updated cwe dataset successfully');
}).catch(e => {
  console.error(e);
  process.exit(127);
});
