import React from 'react';
import { InputNumber } from 'antd';

const NumberInput = ({ value, onChange }) => (
  <InputNumber
    value={value}
    onChange={onChange}
    style={{ width: '50%', borderRadius: 8, padding: 4 }}
  />
);

export default NumberInput;
