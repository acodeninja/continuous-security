export const toDate = (date: Date) => date.toLocaleDateString();

export const toTime = (date: Date) => date.toLocaleTimeString();

export const timezone = (date: Date) =>
  `UTC${date.getTimezoneOffset()/-60 >= 0 ? '+' : ''}${date.getTimezoneOffset()/-60}`;
