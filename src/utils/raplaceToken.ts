export const replaceTokenInURL = (
  url: string,
  term: string,
  param1: string
) => {
  return url.replace(term, param1);
};
