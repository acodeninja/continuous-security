module.exports = {
  transform: {
    '^.+\\.ts$': ['ts-jest'],
  },
  moduleNameMapper: {
    'assets/(.*)': '<rootDir>/test/assetMock.js',
  },
};
