export const searchTweets = (query, location) => (
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
