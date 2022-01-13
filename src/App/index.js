import React, { useEffect } from 'react';

import './styles.css';

import { convert } from '../API';

import NumberInput from './components/number-input';
import SelectInput from './components/select-input';

const App = () => {
  useEffect(() => {
    convert();
  }, []);

  return (
    <div id="root">
      <NumberInput />
      <div id="currency-select-container">
        <SelectInput />
        <SelectInput />
      </div>
    </div>
  );
};

export default App;
