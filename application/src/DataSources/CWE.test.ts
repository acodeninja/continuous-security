import {CWE, CWEDoesNotExist} from './CWE';

describe('with a CWE id that exists', () => {
  const reference= (new CWE).getById('CWE-1004');

  test('has the correct label', () => {
    expect(reference.label).toEqual('CWE-1004');
  });

  test('has the correct title', () => {
    expect(reference.title).toEqual('Sensitive Cookie Without \'HttpOnly\' Flag');
  });

  test('has the correct description', () => {
    expect(reference.description).toEqual('The product uses a cookie to store ' +
      'sensitive information, but the cookie is not marked with the HttpOnly flag.');
  });

  test('has the correct url', () => {
    expect(reference.directLink).toEqual('https://cwe.mitre.org/data/definitions/1004.html');
  });

  test('includes the cwe specific data', () => {
    expect(reference.dataSourceSpecific).toHaveProperty('cwe');
  });

  test('has the correct extended description', () => {
    expect(reference.dataSourceSpecific.cwe.extendedDescription).toMatchSnapshot();
  });

  test('has the correct background', () => {
    expect(reference.dataSourceSpecific.cwe.background).toMatchSnapshot();
  });

  test('has the correct list of consequences', () => {
    expect(reference.dataSourceSpecific.cwe.consequences).toEqual(expect.arrayContaining([{
      scopeImpacts: [{scope: 'Confidentiality', impact: 'Read Application Data'}],
      note: 'If the HttpOnly flag is not set, then sensitive information stored in the cookie ' +
        'may be exposed to unintended parties.',
    }]));
    expect(reference.dataSourceSpecific.cwe.consequences).toEqual(expect.arrayContaining([{
      scopeImpacts: [{scope: 'Integrity', impact: 'Gain Privileges or Assume Identity'}],
      note: 'If the cookie in question is an authentication cookie, then not setting the ' +
        'HttpOnly flag may allow an adversary to steal authentication data (e.g., a session ID) ' +
        'and assume the identity of the user.',
    }]));
  });

  test('has the correct list of mitigations', () => {
    expect(reference.dataSourceSpecific.cwe.mitigations).toEqual(expect.arrayContaining([{
      phase: 'Implementation',
      description: 'Leverage the HttpOnly flag when setting a sensitive cookie in a response.',
      effectiveness: 'High',
      notes: 'While this mitigation is effective for protecting cookies from a browser\'s own ' +
        'scripting engine, third-party components or plugins may have their own engines that ' +
        'allow access to cookies. Attackers might also be able to use XMLHTTPResponse to read ' +
        'the headers directly and obtain the cookie.',
    }]));
  });
});

describe('with a CWE id that does not exist', () => {
  test('throws a CWEDoesNotExist error', () => {
    expect(() => (new CWE).getById('00000')).toThrow(CWEDoesNotExist);
  });
});
