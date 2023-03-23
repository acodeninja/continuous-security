module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest'],
  },
  moduleNameMapper: {
    'assets/cwe(.*)': "<rootDir>/tests/fixtures/assets/CWEData.js",
    'assets/cve(.*)': "<rootDir>/tests/fixtures/assets/CVEData.js",
    'assets/report.template.md': "<rootDir>/tests/fixtures/assets/ReportTemplate.js",
  },
};
