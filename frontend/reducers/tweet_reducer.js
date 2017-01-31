import merge from 'lodash/merge';
import { RECEIVE_TWEETS, RECEIVE_TWEET } from '../actions/tweet_actions.js';

const TweetReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TWEETS:
      return action.tweets;
    case RECEIVE_TWEET:
      return action.tweet;
    default:
      return state;
  }
};

export default TweetReducer;
