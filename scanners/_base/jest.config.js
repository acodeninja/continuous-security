const {resolve} = require("path");
module.exports = {
  transform: {
    '^.+\\.ts$': ['ts-jest'],
  },
  moduleNameMapper: {
    'assets/(.*)': resolve(__dirname, 'test', 'assetMock.js'),
  },
};
