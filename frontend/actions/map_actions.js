// frontend/actions/map_actions.js
// @flow

export const SET_MAP_POSITION = 'SET_MAP_POSITION';

export const setMapPosition = (mapPosition: Object) => ({
  type: SET_MAP_POSITION,
  mapPosition
});
