import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

const SelectInput = ({ options, value, onChange }) => (
  <Select
    onChange={onChange}
    value={value}
    defaultValue={value || options[0].value}
    style={{ width: 260, borderRadius: 8 }}
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

SelectInput.propTypes = {
  value: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.node,
  })),
};

SelectInput.defaultProps = {
  options: [],
  value: null,
};

export default SelectInput;
