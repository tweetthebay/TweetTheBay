import merge from 'lodash/merge';
import { RECEIVE_TWEETS,
        CLEAR_TWEETS,
        RECEIVE_SEARCH_QUERY } from '../actions/tweet_actions.js';

const TweetReducer = (state = {tweets: []}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TWEETS:
      return merge({}, {tweets: action.tweets});
    case CLEAR_TWEETS:
      return {tweets: []};
    default:
      return state;
  }
};

export default TweetReducer;
