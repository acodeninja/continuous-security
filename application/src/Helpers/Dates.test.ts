import {timezone, toDate, toTime} from './Dates';

let getTimezoneOffset, toLocaleDateString, toLocaleTimeString;

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2020, 3, 1, 1, 30, 10, 30));
  getTimezoneOffset = jest.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(0);
  toLocaleDateString =
    jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue('01/04/2020');
  toLocaleTimeString = jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue('01:30:10');
});

afterAll(() => {
  getTimezoneOffset.mockRestore();
  toLocaleDateString.mockRestore();
  toLocaleTimeString.mockRestore();
});

describe('toDate', () => {
  test( 'returns the correct date', () => {
    expect(toDate(new Date)).toEqual('01/04/2020');
  });
});

describe('toTime', () => {
  test( 'returns the correct date', () => {
    expect(toTime(new Date)).toEqual('01:30:10');
  });
});

describe('timezone', () => {
  test( 'returns the correct date', () => {
    expect(timezone(new Date)).toEqual('UTC+0');
  });
});
