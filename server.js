const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static('build'));
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('success');
});

app.get('/convert', (req, res) => {
  const { amount, from, to } = req.query;
  axios
    .get(
      `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=${amount}&symbol=${from}&convert=${to}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': '6c722efe-2833-4ffd-8a1c-f31b4113bf81',
        },
      },
    )
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
});

app.listen(process.env.PORT || 8000, () => console.log(`Listening on port ${process.env.PORT || 8000}!`));
