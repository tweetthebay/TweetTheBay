// frontend/util/tweet_api_util.js
// @flow

export const searchTweets = (query: string, location: Object) => (
  $.ajax({
    method: 'GET',
    url: 'api/tweets',
    data: { query, location },
  })
);

export const fetchTweets = () => (
  $.ajax({
    method: 'GET',
    url: 'api/tweets'
  })
);
