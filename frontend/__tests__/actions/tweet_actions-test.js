/* globals jest */

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as TweetApiUtil from '../../util/tweet_api_util';
import {
  RECEIVE_TWEETS,
  RECEIVE_TWEET_ERRORS,
  CLEAR_TWEETS,
  RECEIVE_SEARCH_QUERY,
  receiveTweets,
  receiveTweetErrors,
  clearTweets,
  setSearchQuery,
  fetchTweets,
} from '../../actions/tweet_actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('tweet actions', () => {
  describe('tweet constants', () => {
    it('should contain a RECEIVE_TWEETS constant', () => {
      expect(RECEIVE_TWEETS).toEqual('RECEIVE_TWEETS');
    });

    it('should contain a RECEIVE_TWEET_ERRORS constant', () => {
      expect(RECEIVE_TWEET_ERRORS).toEqual('RECEIVE_TWEET_ERRORS');
    });

    it('should contain a CLEAR_TWEETS constant', () => {
      expect(CLEAR_TWEETS).toEqual('CLEAR_TWEETS');
    });

    it('should contain a RECEIVE_SEARCH_QUERY constant', () => {
      expect(RECEIVE_SEARCH_QUERY).toEqual('RECEIVE_SEARCH_QUERY');
    });
  });

  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ tweets: {} });
    });

    describe('receiveTweets', () => {
      it('should have a type of RECEIVE_TWEETS', () => {
        expect(receiveTweets().type).toEqual(RECEIVE_TWEETS);
      });

      it('should pass on the tweets we pass in', () => {
        const tweets = {
          tweets: [
            {
              text: 'Tacos. Tacos. Tacos!',
              screenName: 'tacoFan',
            },
            {
              text: 'Eating burritos until life makes more sense',
              screenName: 'burritoGuy',
            },
          ],
        };

        expect(receiveTweets(tweets).tweets).toEqual(tweets);
      });

      it('should pass on the tweets we pass in (with mock store)', () => {
        const tweets = {
          tweets: [
            {
              text: 'Tacos. Tacos. Tacos!',
              screenName: 'tacoFan',
            },
            {
              text: 'Eating burritos until life makes more sense',
              screenName: 'burritoGuy',
            },
          ],
        };

        const expectedActions = [
          {
            type: RECEIVE_TWEETS,
            tweets,
          },
        ];

        store.dispatch(receiveTweets(tweets));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('receiveTweetErrors', () => {
      it('should have a type of RECEIVE_TWEET_ERRORS', () => {
        expect(receiveTweetErrors().type).toEqual(RECEIVE_TWEET_ERRORS);
      });

      it('should pass on the errors we pass in', () => {
        const errors = {
          errors: ['I am an error', 'I am also an error'],
        };

        expect(receiveTweetErrors(errors).errors).toEqual(errors);
      });

      it('should pass on the errors we pass in (with mock store)', () => {
        const errors = {
          errors: ['I am an error', 'I am also an error'],
        };

        const expectedActions = [
          {
            type: RECEIVE_TWEET_ERRORS,
            errors,
          },
        ];

        store.dispatch(receiveTweetErrors(errors));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('clearTweets', () => {
      it('should have a type of CLEAR_TWEETS', () => {
        expect(clearTweets().type).toEqual(CLEAR_TWEETS);
      });

      it('mock store should receive CLEAR_TWEETS action', () => {
        const expectedActions = [
          {
            type: CLEAR_TWEETS,
          },
        ];

        store.dispatch(clearTweets());
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('setSearchQuery', () => {
      it('should have a type of RECEIVE_SEARCH_QUERY', () => {
        expect(setSearchQuery().type).toEqual(RECEIVE_SEARCH_QUERY);
      });

      it('should pass on the query we pass in', () => {
        const query = { query: 'Tacos and Burritos' };
        expect(setSearchQuery(query).query).toEqual(query);
      });

      it('should pass on the query we pass in (with mock store)', () => {
        const query = { query: 'Tacos and Burritos' };

        const expectedActions = [
          {
            type: RECEIVE_SEARCH_QUERY,
            query,
          },
        ];

        store.dispatch(setSearchQuery(query));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('thunks', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ tweets: {} });
    });

    describe('fetchTweets', () => {
      it('should export a fetchTweets function', () => {
        expect(typeof fetchTweets).toEqual('function');
      });
    });

    // TODO: Integrate thunk with 3rd party API call

    // it('dispatches RECEIVE_TWEETS when trends have been fetched', () => {
    //   const query = "query";
    //   const location = "location";
    //   const tweets = {
    //     'tweets': [
    //       {
    //         text: "Tacos. Tacos. Tacos!",
    //         screenName: "tacoFan"
    //       },
    //       {
    //         text: "Eating burritos until life makes more sense",
    //         screenName: "burritoGuy"
    //       }
    //     ]
    //   };
    //
    //   TweetApiUtil.fetchTweets = jest.fn((query, location) => (
    //     Promise.resolve(tweets)
    //   ));
    //
    //   const expectedActions = [{
    //     type: "RECEIVE_TWEETS",
    //     tweets
    //   }];
    //
    //   return store.dispatch(fetchTweets(query, location)).then(() => {
    //     expect(store.getActions()).toEqual(expectedActions);
    //   });
    // });
    // });
  });
});
