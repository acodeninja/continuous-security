import {capitalise, isURL, tidyString} from './Strings';

describe('isURL', () => {
  test('returns true for an http url', () => {
    expect(isURL('https://example.com')).toBeTruthy();
  });

  test('returns false for a unix filesystem path', () => {
    expect(isURL('/path/to/file')).toBeFalsy();
  });

  test('returns false for a windows filesystem path', () => {
    expect(isURL('C:\\Path\\To\\File')).toBeFalsy();
  });

  test('returns false for null input', () => {
    expect(isURL(undefined)).toBeFalsy();
  });
});

describe('capitalise', () => {
  test('a single word', () => {
    expect(capitalise('test')).toEqual('Test');
  });

  test('multiple words', () => {
    expect(capitalise('test case')).toEqual('Test Case');
  });
});

describe('tidyString', () => {
  test('single line', () => {
    expect(tidyString('a  single line     of text')).toEqual('a single line of text');
  });

  test('multiline', () => {
    expect(tidyString('multiple lines\nof text')).toEqual('multiple lines of text');
  });
});
