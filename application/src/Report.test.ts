import {Report} from './Report';

describe('getting cwe details', () => {
  const report = new Report();

  describe('a numerical reference', () => {
    const details = report.getCweDetails(1004);

    test('gets the cwe name', () => {
      expect(details).toHaveProperty('name', 'Sensitive Cookie Without \'HttpOnly\' Flag');
    });
    test('gets the cwe description', () => {
      expect(details).toHaveProperty('description', 'The HttpOnly flag directs compatible browsers to prevent client-side script from accessing cookies. Including the HttpOnly flag in the Set-Cookie HTTP response header helps mitigate the risk associated with Cross-Site Scripting (XSS) where an attacker\'s script code might attempt to read the contents of a cookie and exfiltrate information obtained. When set, browsers that support the flag will not reveal the contents of the cookie to a third party via client-side script executed via XSS.');
    });
    test('gets the link to the mitre website', () => {
      expect(details).toHaveProperty('link', 'https://cwe.mitre.org/data/definitions/1004.html');
    });
  });

  describe('a prefixed string reference', () => {
    const details = report.getCweDetails('CWE-1004');

    test('gets the cwe name', () => {
      expect(details).toHaveProperty('name', 'Sensitive Cookie Without \'HttpOnly\' Flag');
    });
    test('gets the cwe description', () => {
      expect(details).toHaveProperty('description', 'The HttpOnly flag directs compatible browsers to prevent client-side script from accessing cookies. Including the HttpOnly flag in the Set-Cookie HTTP response header helps mitigate the risk associated with Cross-Site Scripting (XSS) where an attacker\'s script code might attempt to read the contents of a cookie and exfiltrate information obtained. When set, browsers that support the flag will not reveal the contents of the cookie to a third party via client-side script executed via XSS.');
    });
    test('gets the link to the mitre website', () => {
      expect(details).toHaveProperty('link', 'https://cwe.mitre.org/data/definitions/1004.html');
    });
  });

  test('throws an error for a non-existent CWE', () => {
    expect(() => report.getCweDetails(9999)).toThrow('Could not find CWE');
  });
});
