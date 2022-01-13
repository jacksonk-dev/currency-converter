import ReactDOM from 'react-dom';

describe('Root Index', () => {
  beforeAll(async () => {
    ReactDOM.render = jest.fn();
    await import('.');
  });
  
  it('should call ReactDOM.render and register service worker', () => {
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
