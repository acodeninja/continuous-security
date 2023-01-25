const {name, version} = require('../package.json');
const {readFile} = require('fs/promises');

const Dockerfile = require('./assets/Dockerfile');
const Scan = require('./assets/scan.sh');

/**
 * @type {Scanner}
 */
const scanner = {
  name,
  version,
  slug: 'npm-audit',
  buildConfiguration: {files: {Dockerfile, 'scan.sh': Scan}},
  validate: async (configuration) => {},
  report: async (location) =>
    readFile(location)
      .then(content => content.toString('utf-8'))
      .then(content => JSON.parse(content))
      .then(report => ({
        issues: Object.entries(report.vulnerabilities).map(([name, content]) => ({
          name,
          description: content.title,
          type: 'dependency',
        })),
        counts: report.metadata,
      })),
};

module.exports = scanner;
