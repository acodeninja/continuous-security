export const tidyString = (input: string) =>
  input.replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const isURL = (input: unknown): input is URL => {
  try {
    if (!input) return false;
    const url = new URL(input as string);
    return !!url.protocol && !!url.host;
  } catch (e) {
    return false;
  }
};
