import React, { useState, useEffect } from "react";

import "./styles.css";

import { convert, supportedCryptoCurrencies, supportedFIATCurrencies } from "../API";

import NumberInput from "./components/number-input";
import SelectInput from "./components/select-input";

const App = () => {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState(supportedCryptoCurrencies[0].abbr)
  const [to, setTo] = useState(supportedFIATCurrencies[0].abbr)
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertCurrency = (data) => {
    setLoading(true);
    convert(data)
    .then((result) => {
      const latestRate = result.data.data.quote[to].price;
      console.log(latestRate)
      setRate(Math.round((latestRate + Number.EPSILON) * 100) / 100);
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const generateCurrencyFullName = (currencyObj) => {
    const { name, abbr, symbol } = currencyObj;
    let fullName = name;
    fullName += symbol ? ` "${symbol}" ` : ' ';
    fullName += `(${abbr})`;
    return fullName;
  }

  useEffect(() => {
    convertCurrency({ amount, from, to });
  }, [])

  return (
    <div id="root">
      <NumberInput 
        value={amount} 
        onChange={(newAmount) => {
          setAmount(newAmount);
          convertCurrency({ amount: newAmount, from, to });
        }} 
      />
      <div id="currency-select-container">
        <SelectInput 
          value={from} 
          onChange={(newFrom) => {
            setFrom(newFrom);
            convertCurrency({ amount, from: newFrom, to });
          }} 
          options={supportedCryptoCurrencies.map((currency) => {
            return {
              label: generateCurrencyFullName(currency),
              value: currency.abbr
          }})} 
        />
        <SelectInput 
          value={to} 
          onChange={(newTo) => {
            setTo(newTo);
            convertCurrency({ amount, from, to: newTo});
          }} 
          options={supportedFIATCurrencies.map((currency) => {
            return {
              label: generateCurrencyFullName(currency),
              value: currency.abbr
          }})} 
        />
      </div>
      <div className="rateContainer">
        <span className="value">{ amount }</span>
        <span>{ generateCurrencyFullName(supportedCryptoCurrencies.find(({abbr}) => abbr === from)) }</span>
        <span className="currencyEquator">=</span>
        <span className="value">{ rate }</span>
        <span>{ generateCurrencyFullName(supportedFIATCurrencies.find(({abbr}) => abbr === to)) }</span>
      </div>
    </div>
  );
};

export default App;
