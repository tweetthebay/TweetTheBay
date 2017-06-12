/* globals jest */

import RootReducer from '../../reducers/root_reducer';
import configureStore from '../../store/store';

jest.mock('../../reducers/root_reducer', () => jest.fn(() => ({
  tweets: {
    tweets: [
      {
        text: 'I am a tweet',
        screenName: 'Michael',
      },
    ],
  },
})));

describe('Store', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    RootReducer.mockClear();
  });

  it('should export a configureStore function', () => {
    expect(typeof configureStore).toEqual('function');
  });

  it('the exported function should create a store when invoked', () => {
    expect(store.getState()).toEqual({
      tweets: {
        tweets: [
          {
            text: 'I am a tweet',
            screenName: 'Michael',
          },
        ],
      },
    });
  });

  it('passes dispatched objects the the reducer', () => {
    store.dispatch({ type: 'TEST' });

    // RootReducer should be called twice: when the store is configured & when
    // object is dispatched
    expect(RootReducer).toHaveBeenCalledTimes(2);
  });

  it('creates a store with thunk middleware', () => {
    store.dispatch(() => {});

    // RootReducer should only be called once: when the store is configured
    expect(RootReducer).toHaveBeenCalledTimes(1);
  });
});
