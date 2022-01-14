import React, { useEffect, useState } from "react";

import "./styles.css";

import { convert, supportedCryptoCurrencies, supportedFIATCurrencies } from "../API";

import NumberInput from "./components/number-input";
import SelectInput from "./components/select-input";

const App = () => {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState(supportedCryptoCurrencies[0].symbol)
  const [to, setTo] = useState(supportedFIATCurrencies[0].abbr)

  useEffect(() => {
    convert(amount, from, to)
  }, []);

  return (
    <div id="root">
      <NumberInput value={amount} onChange={setAmount} />
      <div id="currency-select-container">
        <SelectInput 
          value={from} 
          onChange={(v) => {
            console.log(v)
          }} 
          options={supportedCryptoCurrencies.map(({ abbr, name}) => ({
            label: `${name} (${abbr})`,
            value: abbr
          }))} 
        />
        <SelectInput 
          value={to} 
          onChange={setTo}
          options={supportedFIATCurrencies.map(({ symbol, abbr, name}) => ({
            label: `${name} "${symbol}" (${abbr})`,
            value: abbr
          }))} 
        />
      </div>
    </div>
  );
};

export default App;
