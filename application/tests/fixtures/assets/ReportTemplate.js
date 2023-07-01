const {resolve} = require('path');
const {readFileSync} = require('fs');

const template = readFileSync(resolve('src/assets/report.template.md'));

module.exports = template;
