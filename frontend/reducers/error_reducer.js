// frontend/reducers/error_reducer.js
// @flow

import { RECEIVE_TWEET_ERRORS } from '../actions/tweet_actions';

const ErrorReducer = (state: Object = {}, action: Object) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TWEET_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default ErrorReducer;
