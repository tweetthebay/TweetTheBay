import { combineReducers } from 'redux';
import TweetReducer from './tweet_reducer';
import ErrorReducer from './error_reducer';
import MapPositionReducer from './map_position_reducer';
import CurrentTweetReducer from './current_tweet_reducer';

const rootReducer = combineReducers({
  tweets: TweetReducer,
  errors: ErrorReducer,
  mapPosition: MapPositionReducer,
  currentTweet: CurrentTweetReducer
});

export default rootReducer;
