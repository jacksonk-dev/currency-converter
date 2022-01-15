import React, { useState, useEffect } from 'react';
import { RiArrowLeftRightFill as ButtonIcon } from 'react-icons/ri';
import { Oval } from 'react-loader-spinner';

import './styles.css';

import { generateCurrencyFullName } from '../helpers/formatters';
import { convert, supportedCurrencies } from '../API';
import NumberInput from './components/number-input';
import SelectInput from './components/select-input';

const App = () => {
  const [cryptoIsBase, setCryptoAsBase] = useState(true);

  const baseCurrencies = supportedCurrencies.filter(
    ({ crypto }) => (crypto && cryptoIsBase) || (!crypto && !cryptoIsBase),
  );
  const otherCurrencies = supportedCurrencies.filter(
    ({ abbr }) => !baseCurrencies.find(base => base.abbr === abbr),
  );

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState(baseCurrencies[0].abbr);
  const [to, setTo] = useState(otherCurrencies[0].abbr);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);

  const convertCurrency = (data) => {
    if (data.amount === 0) {
      setRate(0);
    } else {
      convert(data)
        .then((result) => {
          const latestRate = result.data.data.quote[data.to].price;
          setRate(Math.round((latestRate + Number.EPSILON) * 100) / 100);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { // Delay call for 300ms, give user time to stop pressing keys
      convertCurrency({ amount, from, to });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [amount, from, to]);

  return (
    <div id="root">
      <NumberInput
        value={amount}
        onChange={(newAmount) => {
          if (typeof newAmount === 'number') {
            setLoading(true);
            setAmount(newAmount);
          }
        }}
        placeholder="Enter Amount to Convert"
      />
      <div id="currency-select-container">
        <SelectInput
          value={from}
          onChange={(newFrom) => {
            setLoading(true);
            setFrom(newFrom);
          }}
          options={baseCurrencies.map(currency => ({
            label: generateCurrencyFullName(currency),
            value: currency.abbr,
          }))}
        />
        <div
          className="primaryButton"
          onClick={() => {
            setCryptoAsBase(!cryptoIsBase);
            setFrom(to);
            setTo(from);
          }}
        >
          <ButtonIcon />
        </div>
        <SelectInput
          value={to}
          onChange={(newTo) => {
            setLoading(true);
            setTo(newTo);
          }}
          options={otherCurrencies.map(currency => ({
            label: generateCurrencyFullName(currency),
            value: currency.abbr,
          }))}
        />
      </div>
      <div className="rateContainer">
        <div />
        <div>
          <span className="value">{ amount }</span>
          <span>
            { generateCurrencyFullName(supportedCurrencies.find(({ abbr }) => abbr === from)) }
          </span>
          <span className="currencyEquator">=</span>
          {
            loading
              ? (
                <Oval
                  arialLabel="loading-indicator"
                  height={12}
                  width={12}
                  color="#000"
                  wrapperClass="loader"
                />
              )
              : <span className="value">{ rate }</span>
          }
          <span>{ generateCurrencyFullName(supportedCurrencies.find(({ abbr }) => abbr === to)) }</span>
        </div>
      </div>
    </div>
  );
};

export default App;
