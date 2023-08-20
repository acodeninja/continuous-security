// eslint-disable-next-line @typescript-eslint/no-var-requires
const {existsSync} = require('fs');

module.exports = async () => {
  /* eslint-disable no-undef */
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2020, 3, 1, 1, 30, 10, 30));
  jest.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(0);

  global.__non_webpack_require__ = jest.fn().mockImplementation((path) => {
    if (existsSync(path)) return require(path);
    return {default: ''};
  });
  /* eslint-enable no-undef */
};
