import {CWE, CWEDoesNotExist} from "./CWE";

describe('with a CWE id that exists', () => {
  const reference= (new CWE).getById('CWE-1004');

  test('has the correct label', () => {
    expect(reference.label).toEqual('CWE-1004');
  });

  test('has the correct title', () => {
    expect(reference.title).toEqual('Sensitive Cookie Without \'HttpOnly\' Flag');
  });

  test('has the correct description', () => {
    expect(reference.description).toEqual('The product uses a cookie to store sensitive information, but the cookie is not marked with the HttpOnly flag.');
  });

  test('has the correct url', () => {
    expect(reference.url).toEqual('https://cwe.mitre.org/data/definitions/1004.html');
  });
});

describe('with a CWE id that does not exist', () => {
  test('throws a CWEDoesNotExist error', () => {
    expect(() => (new CWE).getById('00000')).toThrow(CWEDoesNotExist);
  });
});
