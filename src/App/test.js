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

    describe('After waiting', () => {
      let waitedCall;
      it('should call the convert function 300ms after data changes', () => {
        act(() => {
          wrapper.find(NumberInput).prop('onChange')(5);
        });
        waitedCall = setTimeout(() => {
          expect(convert).toHaveBeenCalled();
        }, 300);
      });

      it('Should not crash if user deletes amount', () => {
        act(() => {
          wrapper.find(NumberInput).prop('onChange')('');
        });

        waitedCall = setTimeout(() => {
          expect(wrapper);
        }, 500);
      });

      it('Should set the rate to 0 if the user provides 0 as the amount', () => {
        act(() => {
          wrapper.find(NumberInput).prop('onChange')(0);
        });

        waitedCall = setTimeout(() => {
          expect(wrapper.find('#rate').innerHTML).toBe(7);
        }, 500);
      });

      afterEach(() => {
        clearTimeout(waitedCall);
      });
    });
  });
});
