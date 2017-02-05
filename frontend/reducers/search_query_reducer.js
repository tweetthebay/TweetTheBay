import merge from 'lodash/merge';
import { RECEIVE_SEARCH_QUERY } from '../actions/tweet_actions.js';

const SearchQueryReducer = (state = null, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_SEARCH_QUERY:
      return action.query;
    default:
      return state;
  }
};

export default SearchQueryReducer;
