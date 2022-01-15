import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

const NumberInput = ({
  value, onChange, min, placeholder,
}) => (
  <InputNumber
    min={min}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{ width: 260, borderRadius: 4 }}
  />
);

NumberInput.propTypes = {
  min: PropTypes.number,
  value: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

NumberInput.defaultProps = {
  min: 0,
  value: undefined,
  placeholder: 'Enter Number',
};

export default NumberInput;
