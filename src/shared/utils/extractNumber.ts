export const extractNumber = (value: string): string => {
  const matches = value.match(/[\d.,]+/g);
  if (matches) {
    const number = parseFloat(matches[0].replace(/,/g, '.'));
    return number.toString();
  }
  return '';
};
