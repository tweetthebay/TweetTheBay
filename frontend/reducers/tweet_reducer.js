import merge from 'lodash/merge';
import { RECEIVE_TWEETS} from '../actions/tweet_actions.js';

const TweetReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_TWEETS:
      return action.tweets;
    default:
      return state;
  }
};

export default TweetReducer;
