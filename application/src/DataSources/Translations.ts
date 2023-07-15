export const terms: Record<string, string> = {
  'blacklist': 'block list',
  'whitelist': 'allow list',
};

export const translate = (input: string): string => {
  Object.entries(terms)
    .forEach(([find, replace]) => {
      input = input.replace(new RegExp(find, 'g'), replace);
    });

  return input;
}
