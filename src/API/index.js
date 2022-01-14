import axios from 'axios';

const conversionURL = 'http://localhost:8000/convert';

export const supportedCryptoCurrencies = [
  { abbr: 'BTC', name: 'Bitcoin' },
  { abbr: 'ETH', name: 'Ethereum' },
  { abbr: 'USDT', name: 'Tether' },
];

export const supportedFIATCurrencies = [
  { symbol: '$', abbr: 'USD', name: 'US Dollar' },
  { symbol: 'L', abbr: 'ALL', name: 'Albanian Lek' },
  { symbol: 'ARS', abbr: 'ARS', name: 'Argentine Peso' },
];

export const convert = (amount = 5, from = 'BTC', to = 'USD') => {
  axios.get(conversionURL, {
    params: {
      amount,
      from,
      to,
    }
  })
    .then(response => console.log(response))
    .then(data => console.log(data));
};
