const conversionURL = new URL('https://pro-api.coinmarketcap.com/v1/tools/price-conversion');

export const supportedCryptoCurrencies = [
  { BTC: 'Bitcoin' },
];

export const supportedFIATCurrencies = [
  { USD: 'US Dollar' },
];

export const convert = (amount = 5, from = 'BTC', to = 'USD') => {
  conversionURL.searchParams.set('amount', amount);
  conversionURL.searchParams.set('symbol', from);
  conversionURL.searchParams.set('convert', to);

  fetch(conversionURL)
    .then(response => response.json())
    .then(data => console.log(data));
};
