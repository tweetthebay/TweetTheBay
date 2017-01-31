import * as APIUtils from '../util/tweet_api_util.js';

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const RECEIVE_TWEET_ERRORS = "RECEIVE_ERRORS";

export const fetchTweets = () => dispatch => (
  APIUtils.fetchTweets().then(data => dispatch(receiveTweets(data)),
    err => dispatch(receiveTweetErrors(err.responseJSON)))
);

const receiveTweets = tweets => ({
  type: RECEIVE_TWEETS,
  tweets
});

const receiveTweetErrors = errors => ({
  type: RECEIVE_TWEET_ERRORS,
  errors
});
