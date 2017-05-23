/* globals jest */

import TweetReducer from '../../reducers/tweet_reducer';
import ErrorReducer from '../../reducers/error_reducer';
import MapPositionReducer from '../../reducers/map_position_reducer';
import CurrentTweetReducer from '../../reducers/current_tweet_reducer';
import StreamReducer from '../../reducers/stream_reducer';
import CurrentTrendReducer from '../../reducers/current_trend_reducer';
import SearchQueryReducer from '../../reducers/search_query_reducer';
import RootReducer from '../../reducers/root_reducer';
import { createStore } from 'redux';

describe('Reducers', () => {
  describe('RootReducer', () => {
    let fakeStore;

    beforeAll(() => {
      fakeStore = createStore(RootReducer);
    });

    it('exports a function', () => {
      expect(typeof RootReducer).toEqual('function');
    });

    it('includes the TweetReducer under the key `tweet`', () => {
      const tweets = {
        'tweets': [
          {
            text: 'Tacos. Tacos. Tacos!',
            screenName: 'tacoFan'
          },
          {
            text: 'Eating burritos until life makes more sense',
            screenName: 'burritoGuy'
          }
        ]
      };

      const action = {
        type: 'RECEIVE_TWEETS',
        tweets
      };

      fakeStore.dispatch(action);

      expect(fakeStore.getState().tweets)
        .toEqual(TweetReducer({}, action));
    });

    it('includes the CurrentTweetReducer under the key `currentTweet`', () => {
      const tweet = {
        id: 1
      };

      const action = {
        type: 'SET_CURRENT_TWEET',
        tweet
      };

      fakeStore.dispatch(action);

      expect(fakeStore.getState().currentTweet)
        .toEqual(CurrentTweetReducer({}, action));
    });

    it('includes the MapPositionReducer under the key `mapPosition`', () => {
      const mapPosition = {
        lat: 37.9,
        lng: -122.5,
        radius: 42.99316579561581
      };

      const action = {
        type: 'SET_MAP_POSITION',
        mapPosition
      };

      fakeStore.dispatch(action);

      expect(fakeStore.getState().mapPosition)
        .toEqual(MapPositionReducer({}, action));
    });

    it('includes the StreamReducer under the key `stream`', () => {
      const streamtweets = {
        'tweets': [
          {
            text: 'Tacos. Tacos. Tacos!',
            screenName: 'tacoFan'
          },
          {
            text: 'Eating burritos until life makes more sense',
            screenName: 'burritoGuy'
          }
        ]
      };

      const action = {
        type: 'RECEIVE_STREAM',
        tweets: streamtweets
      };

      fakeStore.dispatch(action);

      expect(fakeStore.getState().stream)
        .toEqual(StreamReducer({}, action));
    });

    it('includes the CurrentTrendReducer under the key `currentTrends`', () => {
      const currentTrends = {
        'trends': [
          {
            name: "#DubNation",
            volume: 46800
          },
          {
            name: "Giants",
            volume: 33620
          }
        ]
      };

      const action = {
        type: 'RECEIVE_CURRENT_TRENDS',
        currentTrends
      };

      fakeStore.dispatch(action);

      expect(fakeStore.getState().currentTrends)
        .toEqual(CurrentTrendReducer({}, action));
    });

    it('includes the SearchQueryReducer under the key `searchQuery`', () => {
      const query = 'tacos';

      const action = {
        type: 'RECEIVE_SEARCH_QUERY',
        query
      };

      fakeStore.dispatch(action);

      expect(fakeStore.getState().searchQuery)
        .toEqual(SearchQueryReducer({}, action));
    });

    it('includes the ErrorReducer under the key `errors`', () => {
      const errors = {
        errors: [
          'I am an error',
          'I am also an error'
        ]
      };

      const action = {
        type: 'RECEIVE_ERRORS',
        errors
      };

      fakeStore.dispatch(action);

      expect(fakeStore.getState().errors)
        .toEqual(ErrorReducer({}, action));
    });
  });
});
