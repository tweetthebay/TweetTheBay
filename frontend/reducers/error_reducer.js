import { RECEIVE_ERRORS } from '../actions/tweet_actions';
import merge from 'lodash/merge';

const ErrorReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default ErrorReducer;
