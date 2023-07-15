import {terms, translate} from "./Translations";

describe('a string without any excluding terms', () => {
  const input = "this sentence is completely inclusive";

  test('is unchanged by translation', () => {
    expect(translate(input)).toEqual(input);
  });
});

describe('a string with one excluding term', () => {
  test.each(Object.entries(terms))('swaps %s for %s', (find, replace) => {
    expect(translate(`term ${find}`)).toEqual(`term ${replace}`);
  });
});

describe('a string with every excluding term', () => {
  test('correctly replaces', () => {
    const input = Object.keys(terms).map(t => `${t}\n${t}`).join('\n');
    const expected = Object.values(terms).map(t => `${t}\n${t}`).join('\n');

    expect(translate(input)).toEqual(expected);
  })
});
