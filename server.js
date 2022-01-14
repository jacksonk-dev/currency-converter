const axios = require("axios");
const express = require("express");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  axios
    .get(
      "https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=5&symbol=BTC&convert=USD",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "6c722efe-2833-4ffd-8a1c-f31b4113bf81"
        }
      }
    )
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
  // res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
