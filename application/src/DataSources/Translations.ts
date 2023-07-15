export const terms: Record<string, string> = {
  'blacklist': 'block list',
  'whitelist': 'allow list',
};

export const translate = (input: string): string => {
  Object.entries(terms)
    .forEach(([find, replace]) => {
      input = input.replace(new RegExp(find, 'gi'), (substring) => {
        const replaceWith = terms[substring.toLowerCase()];
        if (substring[0] === substring[0].toLowerCase()) return replaceWith;
        return `${replaceWith[0].toUpperCase()}${replaceWith.slice(1)}`;
      });
    });

  return input;
};
