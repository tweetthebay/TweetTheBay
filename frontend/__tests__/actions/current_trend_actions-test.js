/* globals jest */

import * as CurrentTrendApiUtil from '../../util/current_trend_api_util';

import {
  RECEIVE_CURRENT_TRENDS,
  receiveCurrentTrends,
  fetchCurrentTrends
} from '../../actions/current_trend_actions';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('current trend actions', () => {
  describe('current trend constants', () => {
    it('should contain a RECEIVE_CURRENT_TRENDS constant', () => {
      expect(RECEIVE_CURRENT_TRENDS).toEqual('RECEIVE_CURRENT_TRENDS');
    });
  });

  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ currentTrends: {} });
    });

    describe('receiveCurrentTrends', () => {
      it('should have a type of RECEIVE_CURRENT_TRENDS', () => {
        expect(receiveCurrentTrends().type).toEqual(RECEIVE_CURRENT_TRENDS);
      });

      it('should pass on the currentTrends we pass in', () => {
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

        expect(receiveCurrentTrends(currentTrends).currentTrends).toEqual(currentTrends);
      });

      it ('should pass on the currentTrends we pass in (with mock store)', () => {
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

        const expectedActions = [{
          type: RECEIVE_CURRENT_TRENDS,
          currentTrends
        }];

        store.dispatch(receiveCurrentTrends(currentTrends));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('thunks', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ currentTrends: {} });
    });

    describe('fetchCurrentTrends', () => {
      it('should export a fetchCurrentTrends function', () => {
        expect(typeof fetchCurrentTrends).toEqual('function');
      });

      it('dispatches RECEIVE_CURRENT_TRENDS when trends have been fetched', () => {
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

        CurrentTrendApiUtil.fetchCurrentTrends = jest.fn(() => (
          Promise.resolve(currentTrends)
        ));

        const expectedActions = [{
          type: RECEIVE_CURRENT_TRENDS,
          currentTrends
        }];

        return store.dispatch(fetchCurrentTrends()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });
});
