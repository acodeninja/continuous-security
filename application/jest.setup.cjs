 
const {existsSync} = require('fs');

module.exports = async () => {
   
  global.__non_webpack_require__ = jest.fn().mockImplementation((path) => {
    if (existsSync(path)) return require(path);
    return {default: ''};
  });
   
};
