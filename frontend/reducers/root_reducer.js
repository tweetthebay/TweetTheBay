// frontend/reducers/root_reducer.js
// @flow

import { combineReducers } from 'redux';
import TweetReducer from './tweet_reducer';
import ErrorReducer from './error_reducer';
import MapPositionReducer from './map_position_reducer';
import CurrentTweetReducer from './current_tweet_reducer';
import StreamReducer from './stream_reducer';
import CurrentTrendReducer from './current_trend_reducer';
import SearchQueryReducer from './search_query_reducer';

const rootReducer = combineReducers({
  tweets: TweetReducer,
  errors: ErrorReducer,
  mapPosition: MapPositionReducer,
  currentTweet: CurrentTweetReducer,
  stream: StreamReducer,
  currentTrends: CurrentTrendReducer,
  searchQuery: SearchQueryReducer,
});

export default rootReducer;
