import { RECEIVE_TWEET_ERRORS } from '../actions/tweet_actions';

const ErrorReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TWEET_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default ErrorReducer;
