import {getAllTerms, translate} from './Translations';

describe('a string without any excluding terms', () => {
  const input = 'this sentence is completely inclusive';

  test('is unchanged by translation', () => {
    expect(translate(input)).toEqual(input);
  });
});

describe('a string with one excluding term', () => {
  test.each(getAllTerms())('swaps %s for %s', (find, replace) => {
    expect(translate(`term ${find}`)).toEqual(`term ${replace}`);
  });
});

describe('a string with every excluding term', () => {
  test('replaced with inclusive terms', () => {
    const input = Object.keys(Object.fromEntries(getAllTerms()))
      .map(t => `${t}\n${t}`).join('\n');
    const expected = Object.values(Object.fromEntries(getAllTerms()))
      .map(t => `${t}\n${t}`).join('\n');

    expect(translate(input)).toEqual(expected);
  });
});

describe('a string with mixed case excluding terms', () => {
  test('replaced with inclusive terms', () => {
    const input = Object.keys(Object.fromEntries(getAllTerms()))
      .map(t => `${t[0].toUpperCase() + t.slice(1)}`).join('\n');
    const expected = Object.values(Object.fromEntries(getAllTerms()))
      .map((t: string) => `${t[0].toUpperCase() + t.slice(1)}`).join('\n');

    expect(translate(input)).toEqual(expected);
  });
});
