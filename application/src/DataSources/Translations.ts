export const terms: Record<string, string> = {
  'black box': 'closed box',
  'black hat': 'attacker',
  'black list': 'block list',
  'man in the middle': 'adversary-in-the-middle',
  'sanity check': 'coherence check',
  'white box': 'open box',
  'white hat': 'offensive security researcher',
  'white label': 'unlabeled',
  'white list': 'allow list',
  abort: 'cancel',
  cripple: 'degrade',
  disable: 'deactivate',
  he: 'they',
  her: 'they',
  him: 'they',
  man: 'person',
  master: 'main',
  segregate: 'separate',
  she: 'they',
  slave: 'subordinate',
  tribe: 'team',
  woman: 'person',
};

export const getAllTerms = (): Array<Array<string>> => Object.entries(terms)
  .map(([find, replace]) => {
    if (find.split('').includes(' ')) {
      return [
        [find, replace],
        [find.replace(/\s/g, '-'), replace],
        [find.replace(/\s/g, ''), replace],
      ];
    }
    return [[find, replace]];
  })
  .flat();

export const translate = (input: string): string => {
  getAllTerms().forEach(([find, replace]) => {
    input = input.replace(new RegExp(`\\b${find}\\b`, 'gmi'), (substring): string => {
      if (substring[0] === substring[0].toLowerCase()) return replace;
      return `${replace[0].toUpperCase()}${replace.slice(1)}`;
    });
  });

  return input;
};
