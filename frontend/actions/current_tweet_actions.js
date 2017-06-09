// frontend/actions/current_tweet_actions.js
// @flow

export const SET_CURRENT_TWEET = 'SET_CURRENT_TWEET';

export const setCurrentTweet = (tweet: Object) => ({
  type: SET_CURRENT_TWEET,
  tweet,
});
