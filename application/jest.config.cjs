module.exports = {
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        module: 'nodenext',
        moduleResolution: 'nodenext',
      },
    }],
  },
  moduleNameMapper: {
    '../assets/cwe.xml': '<rootDir>/tests/fixtures/assets/CWEData.cjs',
    'assets/report.html.template.md': '<rootDir>/tests/fixtures/assets/ReportHTMLTemplate.cjs',
    'assets/report.pdf.template.md': '<rootDir>/tests/fixtures/assets/ReportPDFTemplate.cjs',
    'assets/report.html.wrapper.html':
        '<rootDir>/tests/fixtures/assets/ReportHTMLTemplateWrapper.cjs',
    'assets/report.markdown.template.md':
      '<rootDir>/tests/fixtures/assets/ReportMarkdownTemplate.cjs',
  },
  setupFiles: ['./jest.setup.cjs'],
};
