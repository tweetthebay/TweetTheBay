import {combineReducers} from 'redux';
import tweetReducer from './tweet_reducer.js';
export default combineReducers({
  tweet: tweetReducer
});
