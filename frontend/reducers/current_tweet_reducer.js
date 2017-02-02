import { SET_CURRENT_TWEET } from '../actions/current_tweet_actions';
import merge from 'lodash/merge';

const CurrentTweetReducer = (state = null, action) => {
  Object.freeze(state);
  switch(action.type){
    case SET_CURRENT_TWEET:
      return action.tweet;
    default:
      return state;
  }
};

export default CurrentTweetReducer;
