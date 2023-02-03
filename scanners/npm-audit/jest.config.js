module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest'],
  },
  moduleNameMapper: {
    'assets/(.*)': "<rootDir>/test/assetMock.js"
  },
};
