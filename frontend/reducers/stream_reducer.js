// frontend/reducers/stream_reducer.js
// @flow

import merge from 'lodash/merge';
import { RECEIVE_STREAM, CLEAR_STREAM } from '../actions/stream_actions.js';

const StreamReducer = (state: Object = { tweets: [] }, action: Object) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_STREAM:
      return merge({}, { tweets: action.streamtweets });
    case CLEAR_STREAM:
      return { tweets: [] };
    default:
      return state;
  }
};

export default StreamReducer;
