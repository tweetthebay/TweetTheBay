import { SET_MAP_POSITION } from '../actions/map_actions';
import merge from 'lodash/merge';

const MapPositionReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case SET_MAP_POSITION:
      return action.mapPosition;
    default:
      return state;
  }
};

export default MapPositionReducer;
