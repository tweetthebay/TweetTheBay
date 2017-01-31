import RECEIVE_TWEET from '../actions/tweet_actions';
import merge from "lodash/merge";


const tweetReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TWEET:
      return action.tweet;
    default:
      return state;
  }
};

export default tweetReducer;
