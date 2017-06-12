/* globals jest */

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { SET_CURRENT_TWEET, setCurrentTweet } from '../../actions/current_tweet_actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('current tweet actions', () => {
  describe('current tweet constants', () => {
    it('should contain a SET_CURRENT_TWEET constant', () => {
      expect(SET_CURRENT_TWEET).toEqual('SET_CURRENT_TWEET');
    });
  });

  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ currentTweet: {} });
    });

    it('should have a type of SET_CURRENT_TWEET', () => {
      expect(setCurrentTweet().type).toEqual(SET_CURRENT_TWEET);
    });

    it('should pass on the tweet we pass in', () => {
      const currentTweet = { id: 2 };
      expect(setCurrentTweet(currentTweet).tweet).toEqual(currentTweet);
    });

    it('should pass on the tweet we pass in (with mock store)', () => {
      const currentTweet = { id: 2 };

      const expectedActions = [
        {
          type: SET_CURRENT_TWEET,
          tweet: currentTweet,
        },
      ];

      store.dispatch(setCurrentTweet(currentTweet));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
