module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest'],
  },
  moduleNameMapper: {
    'assets/(.*)': "<rootDir>/tests/fixtures/CWEData.js"
  },
};
