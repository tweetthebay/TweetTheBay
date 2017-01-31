export const searchTweets = query => (
  $.ajax({
    method: 'GET',
    url: 'api/tweets',
    data: { query }
  })
);

export const fetchTweets = () => (
  $.ajax({
    method: 'GET',
    url: '/api/tweets'
  })
);
