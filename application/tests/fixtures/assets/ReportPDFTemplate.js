const {resolve} = require('path');
const {readFileSync} = require('fs');

const template = readFileSync(resolve('src/assets/report.pdf.template.md'));

module.exports = template;
