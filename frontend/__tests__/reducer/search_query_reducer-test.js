/* globals jest */

import SearchQueryReducer from '../../reducers/search_query_reducer';

describe('Reducers', () => {
  describe('SearchQueryReducer', () => {
    const _oldState = "potato";
    const _defaultState = null;

    it('exports an function', () => {
      expect(typeof SearchQueryReducer).toEqual('function');
    });

    it('should initialize with null as the default state', () => {
      expect(SearchQueryReducer(undefined, {})).toEqual(_defaultState);
    });

    it('should return the previous state if an action is not matched', () => {
      const newState = SearchQueryReducer(_oldState, { type: 'notAType' });
      expect(newState).toEqual(_oldState);
    });

    describe('handling the RECEIVE_SEARCH_QUERY action', () => {
      let query,
          receiveStreamAction;

      beforeEach(() => {
        query = 'tacos';

        receiveStreamAction = {
          type: 'RECEIVE_SEARCH_QUERY',
          query
        };
      });

      it('should replace the state with the receiveStreamAction\'s streams', () => {
        const state = SearchQueryReducer(undefined, receiveStreamAction);
        expect(state).toEqual(query);
      });

      it('should not modify the old state', () => {
        const oldState = "potato";

        SearchQueryReducer(oldState, receiveStreamAction);
        expect(oldState).toEqual(_oldState);
      });
    });
  });
});
