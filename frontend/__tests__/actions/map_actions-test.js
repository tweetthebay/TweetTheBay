/* globals jest */

import {
  SET_MAP_POSITION,
  setMapPosition
} from '../../actions/map_actions';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('map actions', () => {
  describe('map constants', () => {
    it('should contain a SET_MAP_POSITION constant', () => {
      expect(SET_MAP_POSITION).toEqual('SET_MAP_POSITION');
    });
  });

  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ map: {} });
    });

    it('should have a type of SET_MAP_POSITION', () => {
      expect(setMapPosition().type).toEqual(SET_MAP_POSITION);
    });

    it('should pass on the tweet we pass in', () => {
      const mapPosition = {
        lat: 37.9,
        lng: -122.5,
        radius: 42.99316579561581
      };

      expect(setMapPosition(mapPosition).mapPosition).toEqual(mapPosition);
    });

    it ('should pass on the tweet we pass in (with mock store)', () => {
      const mapPosition = {
        lat: 37.9,
        lng: -122.5,
        radius: 42.99316579561581
      };

      const expectedActions = [{
        type: SET_MAP_POSITION,
        mapPosition
      }];

      store.dispatch(setMapPosition(mapPosition));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
