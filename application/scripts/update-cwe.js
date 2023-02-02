#!/usr/bin/env node

const {createWriteStream} = require('fs');
const {get} = require('https');
const {Parse} = require('unzip-stream');

const url = 'https://cwe.mitre.org/data/xml/cwec_latest.xml.zip';
new Promise((resolve, reject) => {
  get(url, response => {
    response.pipe(Parse())
      .on('entry', (entry) => {
        if (entry.path.indexOf('.xml') !== -1) {
          entry.pipe(createWriteStream('src/assets/cwe.xml'));
          entry.on('close', resolve);
          entry.on('error', reject);
        } else {
          entry.autodrain();
        }
      });
  })
}).then(() => {
  console.log('updated cwe dataset successfully');
}).catch(e => {
  console.error(e);
});
