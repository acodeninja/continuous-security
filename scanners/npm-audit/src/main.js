const packageJson = require('../package.json');
const {readFile} = require('fs/promises');

const Dockerfile = require('./assets/Dockerfile');
const Scan = require('./assets/scan.sh');

const scanner = {
  /**
   * @type {string}
   */
  name: packageJson.name,
  /**
   * @type {string}
   */
  version: packageJson.version,
  /**
   * @type {string}
   */
  slug: 'npm-audit',
  /**
   * @type {{files: {[name: string]: string}}}
   */
  buildConfiguration: {files: {Dockerfile, 'scan.sh': Scan}},
  /**
   * @param {{name: string; target?: string;}} configuration
   * @return {Promise<void>}
   */
  validate: async (configuration) => {
  },
  /**
   * @param {string} location
   * @return {Promise<{counts: *, issues: {name: *, description: *, type: string}[]}>}
   */
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
