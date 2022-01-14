import React,  {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

const SelectInput = ({ options, value, onChange }) => {
  return (
  <Select
    onChange={onChange}
    value={value}
    defaultValue={value || options[0].value}
    style={{ width: '100%', borderRadius: 8, padding: 4 }}
  >
    {
      options.map(({ label, value: val }) => (
        <Option value={val} key={label + val}>
          {label}
        </Option>
      ))
    }
  </Select>
);
}

SelectInput.propTypes = {
  value: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})),
}

SelectInput.defaultProps = {
  options: [],
  value: null,
}

export default SelectInput;
