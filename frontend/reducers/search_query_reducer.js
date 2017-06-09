// frontend/reducers/search_query_reducer.js
// @flow

import { RECEIVE_SEARCH_QUERY } from '../actions/tweet_actions';

const SearchQueryReducer = (state: ?Object = null, action: Object) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_QUERY:
      return action.query;
    default:
      return state;
  }
};

export default SearchQueryReducer;
