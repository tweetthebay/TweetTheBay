export const fetchTweets = () => (
  $.ajax({
    method: 'GET',
    url: '/api/tweets'
  })
);
