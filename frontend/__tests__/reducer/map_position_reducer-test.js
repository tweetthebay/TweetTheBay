/* globals jest */

import MapPositionReducer from '../../reducers/map_position_reducer';

describe('Reducers', () => {
  describe('MapPositionReducer', () => {
    const _oldState = {
      lat: 37.9,
      lng: -122.5,
      radius: 42.99316579561581
    };

    it('exports an function', () => {
      expect(typeof MapPositionReducer).toEqual('function');
    });

    it('should initialize with an empty object as the default state', () => {
      expect(MapPositionReducer(undefined, {})).toEqual({});
    });

    it('should return the previous state if an action is not matched', () => {
      const newState = MapPositionReducer(_oldState, { type: 'notAType' });
      expect(newState).toEqual(_oldState);
    });

    describe('handling the SET_MAP_POSITION action', () => {
      let mapPosition,
          setMapAction;

      beforeEach(() => {
        mapPosition = {
          lat: 97.9,
          lng: -129.5,
          radius: 92.99316579561581
        };

        setMapAction = {
          type: 'SET_MAP_POSITION',
          mapPosition
        };
      });

      it('should replace the state with the setMapAction\'s streams', () => {
        const state = MapPositionReducer(undefined, setMapAction);
        expect(state).toEqual(mapPosition);
      });

      it('should not modify the old state', () => {
        const oldState = {
          lat: 37.9,
          lng: -122.5,
          radius: 42.99316579561581
        };

        MapPositionReducer(oldState, setMapAction);
        expect(oldState).toEqual(_oldState);
      });
    });
  });
});
