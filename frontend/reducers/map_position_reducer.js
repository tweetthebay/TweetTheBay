// frontend/reducers/map_position_reducer.js
// @flow

import { SET_MAP_POSITION } from '../actions/map_actions';

const MapPositionReducer = (state: Object = {}, action: Object) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_MAP_POSITION:
      return action.mapPosition;
    default:
      return state;
  }
};

export default MapPositionReducer;
