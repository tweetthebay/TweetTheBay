/* globals jest */

import TweetReducer from '../../reducers/tweet_reducer';

describe('Reducers', () => {
  describe('TweetReducer', () => {
    const _oldState = {
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

    const _defaultState = {
      tweets: []
    };

    it('exports an function', () => {
      expect(typeof TweetReducer).toEqual('function');
    });

    it('should initialize with an empty tweets array as the default state', () => {
      expect(TweetReducer(undefined, {})).toEqual(_defaultState);
    });

    it('should return the previous state if an action is not matched', () => {
      const newState = TweetReducer(_oldState, { type: 'notAType' });
      expect(newState).toEqual(_oldState);
    });

    describe('handling the RECEIVE_TWEETS action', () => {
      let receiveTweetsAction,
          tweets;

      beforeEach(() => {
        tweets = [
          {
            text: 'Hot dogs. Hot dogs. Hot dogs!',
            screenName: 'hotDogFan'
          },
          {
            text: 'Eating hamburgers until life makes more sense',
            screenName: 'hamburgerGuy'
          }
        ]

        receiveTweetsAction = {
          type: 'RECEIVE_TWEETS',
          tweets
        };
      });

      it('should replace the state with the action\'s tweets', () => {
        const state = TweetReducer(undefined, receiveTweetsAction);
        expect(state).toEqual({ tweets });
      });

      it('should not modify the old state', () => {
        const oldState = {
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

        TweetReducer(oldState, receiveTweetsAction);
        expect(oldState).toEqual(_oldState);
      });
    });

    describe('handling the CLEAR_TWEETS action', () => {
      let resetAction;

      beforeEach(() => {
        resetAction = {
          type: 'CLEAR_TWEETS'
        };
      });

      it('should remove the tweets from the state', () => {
        const state = TweetReducer(_oldState, resetAction);
        expect(state).toEqual(_defaultState);
      });
    });
  });
});
