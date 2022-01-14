import axios from 'axios';

const conversionURL = 'http://localhost:8000/convert';

export const supportedCurrencies = [
  { abbr: 'BTC', name: 'Bitcoin', crypto: true },
  { abbr: 'ETH', name: 'Ethereum', crypto: true},
  { abbr: 'USDT', name: 'Tether', crypto: true},
  { symbol: '$', abbr: 'USD', name: 'US Dollar' },
  { symbol: 'L', abbr: 'ALL', name: 'Albanian Lek' },
  { symbol: 'ARS', abbr: 'ARS', name: 'Argentine Peso' },
];

export const convert = (data) => {
  const { amount, from, to } = data;
  return axios.get(conversionURL, {
    params: {
      amount,
      from,
      to,
    },
  });
};
