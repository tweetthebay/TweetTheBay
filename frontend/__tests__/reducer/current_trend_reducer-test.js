/* globals jest */

import CurrentTrendReducer from '../../reducers/current_trend_reducer';

describe('Reducers', () => {
  describe('CurrentTrendReducer', () => {
    const _oldState = {
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

    it('exports an function', () => {
      expect(typeof CurrentTrendReducer).toEqual('function');
    });

    it('should initialize with an empty array as the default state', () => {
      expect(CurrentTrendReducer(undefined, {})).toEqual([]);
    });

    it('should return the previous state if an action is not matched', () => {
      const newState = CurrentTrendReducer(_oldState, { type: 'notAType' });
      expect(newState).toEqual(_oldState);
    });

    describe('handling the RECEIVE_CURRENT_TRENDS action', () => {
      let currentTrends,
          receiveCurrentTrendsAction;

      beforeEach(() => {
        currentTrends = {
          'trends': [
            {
              name: "Burritos",
              volume: 74330
            },
            {
              name: "Tacos",
              volume: 43620
            }
          ]
        };

        receiveCurrentTrendsAction = {
          type: 'RECEIVE_CURRENT_TRENDS',
          currentTrends
        };
      });

      it('should replace the state with the action\'s currentTrends', () => {
        const state = CurrentTrendReducer(undefined, receiveCurrentTrendsAction);
        expect(state).toEqual(currentTrends);
      });

      it('should not modify the old state', () => {
        const oldState = {
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

        CurrentTrendReducer(oldState, receiveCurrentTrendsAction);
        expect(oldState).toEqual(_oldState);
      });
    });
  });
});
