import axios from 'axios';

const conversionURL = 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion';

export const supportedCryptoCurrencies = [
  { BTC: 'Bitcoin' },
];

export const supportedFIATCurrencies = [
  { USD: 'US Dollar' },
];

export const convert = (amount = 5, from = 'BTC', to = 'USD') => {
  axios.get(conversionURL, {
    params: {
      amount,
      symbol: from,
      convert: to,
    },
    headers: {
      'X-CMC_PRO_API_KEY': '6c722efe-2833-4ffd-8a1c-f31b4113bf81',
    },
  })
    .then(response => response.json())
    .then(data => console.log(data));
};
