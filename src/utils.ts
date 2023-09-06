const suffixes = new Map([
  ["zero", "s"],
  ["one", ""],
  ["two", "s"],
  ["few", "s"],
  ["many", "s"],
  ["other", "s"],
]);

const rules = new Intl.PluralRules("en-US");

export const pluralise = (n: number, str: string) => {
  return `${n} ${str + suffixes.get(rules.select(n))}`;
};
