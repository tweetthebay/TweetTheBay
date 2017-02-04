import merge from 'lodash/merge';
import { RECEIVE_TWEETS,
        CLEAR_TWEETS,
        RECEIVE_SEARCH_QUERY } from '../actions/tweet_actions.js';

const TweetReducer = (state = {tweets: [], searchTerm: null}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TWEETS:
      return merge({}, state, {tweets: action.tweets});
    case RECEIVE_SEARCH_QUERY:
      return merge({}, state, {searchTerm: action.query});
    case CLEAR_TWEETS:
      return merge({}, {tweets: []});
    default:
      return state;
  }
};

export default TweetReducer;
