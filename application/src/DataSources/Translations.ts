export const terms: Record<string, string> = {
  'blacklist': 'block list',
  'whitelist': 'allow list',
};

export const translate = (input: string): string => {
  Object.entries(terms)
    .forEach(([find, replace]) => {
      input = input.replace(new RegExp(find, 'gi'), (substring) => {
        if (substring[0] === substring[0].toLowerCase()) return replace;
        return `${replace[0].toUpperCase()}${replace.slice(1)}`;
      });
    });

  return input;
};
