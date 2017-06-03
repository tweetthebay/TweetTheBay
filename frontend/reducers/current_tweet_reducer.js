// frontend/reducers/current_tweet_reducer.js
// @flow

import { SET_CURRENT_TWEET } from '../actions/current_tweet_actions';
import merge from 'lodash/merge';

const CurrentTweetReducer = (state: ?Object = null, action: Object) => {
  Object.freeze(state);
  switch(action.type){
    case SET_CURRENT_TWEET:
      return action.tweet;
    default:
      return state;
  }
};

export default CurrentTweetReducer;
