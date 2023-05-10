module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest'],
  },
  moduleNameMapper: {
    '../assets/cwe.xml': '<rootDir>/tests/fixtures/assets/CWEData.js',
    'assets/report.template.md': '<rootDir>/tests/fixtures/assets/ReportTemplate.js',
  },
};
