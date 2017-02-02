import * as APIUtils from '../util/tweet_api_util.js';

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const RECEIVE_TWEET_ERRORS = "RECEIVE_ERRORS";

export const fetchTweets = (query, location) => dispatch => (
  APIUtils.searchTweets(query, location).then(data => dispatch(receiveTweets(data)),
    err => dispatch(receiveTweetErrors(err.responseJSON)))
);

export const receiveTweets = tweets => ({
  type: RECEIVE_TWEETS,
  tweets
});

export const receiveTweetErrors = errors => ({
  type: RECEIVE_TWEET_ERRORS,
  errors
});
