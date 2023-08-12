const {resolve} = require('path');
const {readFileSync} = require('fs');

const template = readFileSync(resolve('src/assets/report.html.template.md'));

module.exports = template;
