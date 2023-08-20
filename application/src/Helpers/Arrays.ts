export const groupToObjectBy = (list: Array<unknown>, grouping: string) => {
  return list.reduce((group: Record<string, Array<unknown>>, item) => {
    if (item) {
      group[item[grouping]] = group[item[grouping]] ?? [];
      group[item[grouping]].push(item);
    }
    return group;
  }, {});
};

export const sortObjectKeysBy =
    (input: Record<string, unknown>, ordering: Array<string>) => {
      const asEntries = Object.entries(input);

      asEntries.sort((a, b) =>
        ordering.indexOf(a[0]) - ordering.indexOf(b[0]));

      return Object.fromEntries(asEntries);
    };
