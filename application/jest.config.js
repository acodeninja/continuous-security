module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest'],
  },
  moduleNameMapper: {
    '../assets/cwe.xml': '<rootDir>/tests/fixtures/assets/CWEData.js',
    'assets/report.html.template.md': '<rootDir>/tests/fixtures/assets/ReportHTMLTemplate.js',
    'assets/report.html.wrapper.html':
        '<rootDir>/tests/fixtures/assets/ReportHTMLTemplateWrapper.js',
    'assets/report.markdown.template.md':
      '<rootDir>/tests/fixtures/assets/ReportMarkdownTemplate.js',
  },
  setupFiles: ['./jest.setup.js'],
};
