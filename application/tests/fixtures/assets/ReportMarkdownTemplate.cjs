const {resolve} = require('path');
const {readFileSync} = require('fs');

const template = readFileSync(resolve('src/assets/report.markdown.template.md'));

module.exports = template;
