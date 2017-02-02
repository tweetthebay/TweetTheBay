import { RECEIVE_CURRENT_TRENDS } from '../actions/current_trend_actions';
import merge from 'lodash/merge';

const CurrentTrendReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_TRENDS:
      return action.currentTrends;
    default:
      return state;
  }
};

export default CurrentTrendReducer;
