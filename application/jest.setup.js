// eslint-disable-next-line @typescript-eslint/no-var-requires
const {existsSync} = require('fs');

module.exports = async () => {
  /* eslint-disable no-undef */
  global.__non_webpack_require__ = jest.fn().mockImplementation((path) => {
    if (existsSync(path)) return require(path);
    return {default: ''};
  });
  /* eslint-enable no-undef */
};
