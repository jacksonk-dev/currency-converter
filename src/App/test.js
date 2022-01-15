import React from 'react';
import { act } from 'react-dom/test-utils';
import mount from 'enzyme/mount';
import App from '.';
import SelectInput from './components/select-input';
import NumberInput from './components/number-input';
import { convert } from '../API';

jest.mock('./components/select-input', () => () => null);
jest.mock('./components/number-input', () => () => null);
jest.mock('../API', () => ({
  convert: jest.fn(),
  supportedCurrencies: [
    { abbr: 'BTC', name: 'Bitcoin', crypto: true },
    { abbr: 'ETH', name: 'Ethereum', crypto: true },
    { abbr: 'USDT', name: 'Tether', crypto: true },
    { symbol: '$', abbr: 'USD', name: 'US Dollar' },
    { symbol: 'L', abbr: 'ALL', name: 'Albanian Lek' },
    { symbol: 'ARS', abbr: 'ARS', name: 'Argentine Peso' },
  ],
}));

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('should render without crashing', () => {
    expect(wrapper);
  });

  it('should render 2 select inputs', () => {
    expect(wrapper.find(SelectInput)).toHaveLength(2);
  });

  test('that each select input receives at least 3 options', () => {
    expect(wrapper.find(SelectInput).at(0).prop('options').length).toBeGreaterThan(2);
    expect(wrapper.find(SelectInput).at(0).prop('options').length).toBeGreaterThan(2);
  });

  describe('Data Changes', () => {
    it('should not call the convert function immediately after data changes', () => {
      act(() => {
        wrapper.find(NumberInput).prop('onChange')(5);
      });
      expect(convert).not.toHaveBeenCalled();
    });

    describe('Converting after waiting', () => {
      let waitedCall;
      beforeEach(() => {
        act(() => {
          wrapper.find(NumberInput).prop('onChange')(5);
        });
      });

      it('should call the convert function 300ms after data changes', () => {
        waitedCall = setTimeout(() => {
          expect(convert).toHaveBeenCalled();
        }, 300);
      });

      afterEach(() => {
        clearTimeout(waitedCall);
      });
    });
  });
});
