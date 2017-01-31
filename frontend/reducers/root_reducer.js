import { combineReducers } from 'redux';
import TweetReducer from './tweet_reducer';
import ErrorReducer from './error_reducer';

const rootReducer = combineReducers({
  tweets: TweetReducer,
  errors: ErrorReducer
});

export default rootReducer;
