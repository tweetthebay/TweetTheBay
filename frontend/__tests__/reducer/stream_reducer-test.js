/* globals jest */

import StreamReducer from '../../reducers/stream_reducer';

describe('Reducers', () => {
  describe('StreamReducer', () => {
    // eslint-disable-next-line no-underscore-dangle
    const _oldState = {
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

    // eslint-disable-next-line no-underscore-dangle
    const _defaultState = {
      tweets: [],
    };

    it('exports an function', () => {
      expect(typeof StreamReducer).toEqual('function');
    });

    it('should initialize with an empty "tweets" array as the default state', () => {
      expect(StreamReducer(undefined, {})).toEqual(_defaultState);
    });

    it('should return the previous state if an action is not matched', () => {
      const newState = StreamReducer(_oldState, { type: 'notAType' });
      expect(newState).toEqual(_oldState);
    });

    describe('handling the RECEIVE_STREAM action', () => {
      let streamtweets;
      let receiveStreamAction;

      beforeEach(() => {
        streamtweets = [
          {
            text: 'Hot dogs. Hot dogs. Hot dogs!',
            screenName: 'hotDogFan',
          },
          {
            text: 'Eating hamburgers until life makes more sense',
            screenName: 'hamburgerGuy',
          },
        ];

        receiveStreamAction = {
          type: 'RECEIVE_STREAM',
          streamtweets,
        };
      });

      it("should replace the state with the action's streamtweets", () => {
        const state = StreamReducer(undefined, receiveStreamAction);
        expect(state).toEqual({ tweets: streamtweets });
      });

      it('should not modify the old state', () => {
        const oldState = {
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

        StreamReducer(oldState, receiveStreamAction);
        expect(oldState).toEqual(_oldState);
      });
    });

    describe('handling the CLEAR_STREAM action', () => {
      let resetAction;

      beforeEach(() => {
        resetAction = {
          type: 'CLEAR_STREAM',
        };
      });

      it('should remove the streamtweets from the state', () => {
        const state = StreamReducer(_oldState, resetAction);
        expect(state).toEqual(_defaultState);
      });
    });
  });
});
