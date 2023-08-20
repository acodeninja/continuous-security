import {groupToObjectBy, sortObjectKeysBy} from './Arrays';

describe('groupToObjectBy', () => {
  test('groups by string', () => {
    expect(groupToObjectBy([{i: 't'}, {i: 't'}, {i: 'r'}], 'i')).toEqual({
      t: [{i: 't'}, {i: 't'}],
      r: [{i: 'r'}],
    });
  });

  test('groups by number', () => {
    expect(groupToObjectBy([{i: 2.4}, {i: 2.4}, {i: 5}], 'i')).toEqual({
      2.4: [{i: 2.4}, {i: 2.4}],
      5: [{i: 5}],
    });
  });

  test('groups by array', () => {
    expect(groupToObjectBy([{i: [1,2]}, {i: [1,2]}, {i: [1,5]}], 'i')).toEqual({
      '1,2': [{i: [1,2]}, {i: [1,2]}],
      '1,5': [{i: [1,5]}],
    });
  });
});

describe('sortObjectKeysBy', () => {
  test('sorts object keys', () => {
    const input = {one: 'one', two: 'two', three: 'three'};
    const sorted = sortObjectKeysBy(input, ['two', 'three', 'one']);

    expect(Object.entries(sorted)).toEqual([
      ['two', 'two'],
      ['three', 'three'],
      ['one', 'one'],
    ]);
  });
});
