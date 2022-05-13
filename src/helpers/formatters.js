export const generateCurrencyFullName = (currencyObj) => {
  const { name, abbr, symbol } = currencyObj;
  let fullName = name;
  fullName += symbol ? ` "${symbol}" ` : ' ';
  fullName += `(${abbr})`;
  return fullName;
};

export default generateCurrencyFullName;
