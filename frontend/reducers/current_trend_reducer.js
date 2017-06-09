// frontend/reducers/current_trend_reducer.js
// @flow

import { RECEIVE_CURRENT_TRENDS } from '../actions/current_trend_actions';

const CurrentTrendReducer = (state: Array<Object> = [], action: Object) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_TRENDS:
      return action.currentTrends;
    default:
      return state;
  }
};

export default CurrentTrendReducer;
