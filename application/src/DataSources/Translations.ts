export const terms: Record<string, string> = {
  'black box': 'closed box',
  'black list': 'block list',
  'white box': 'open box',
  'white label': 'unlabeled',
  'white list': 'allow list',
  abort: 'cancel',
  master: 'main',
  slave: 'subordinate',
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
    input = input.replace(new RegExp(find, 'gi'), (substring): string => {
      if (substring[0] === substring[0].toLowerCase()) return replace;
      return `${replace[0].toUpperCase()}${replace.slice(1)}`;
    });
  });

  return input;
};
