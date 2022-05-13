const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const { COINMARKETCAP_API_KEY, SERVER_PORT } = process.env;

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.get('/convert', (req, res) => {
  const { amount, from, to } = req.query;
  axios
    .get(
      `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=${amount}&symbol=${from}&convert=${to}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
        },
      },
    )
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
});

app.listen(process.env.PORT || 8000, () => console.log(`Listening on port ${SERVER_PORT || 8000}`));
