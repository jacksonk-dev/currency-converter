import React from 'react';
import mount from 'enzyme/mount';
import App from '.';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('should render without crashing', () => {
    expect(wrapper);
  });
});
