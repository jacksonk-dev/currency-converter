import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectInput = ({ options, value, onChange}) => (
  <Select 
    onChange={onChange}
    defaultValue={value || options[0].value} 
    style={{width: '100%', borderRadius: 8, padding: 4}}
  >
    {
      options.map(({label, value: val}) => (
        <Option value={val} key={label + val}>
          {label}
        </Option>
      ))
    }
  </Select>
);

export default SelectInput;
