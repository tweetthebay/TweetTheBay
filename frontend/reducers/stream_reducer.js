import merge from 'lodash/merge';
import { RECEIVE_STREAM, CLEAR_STREAM } from '../actions/stream_actions.js';

const StreamReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_STREAM:
      return merge({}, state, action.streamtweets);
    case CLEAR_STREAM:
      return {};
    default:
      return state;
  }
};

export default StreamReducer;
