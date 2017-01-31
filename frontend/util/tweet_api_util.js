export const searchTweets = query => (
  $.ajax({
    method: 'GET',
    url: 'api/tweets',
    dataType: 'json',
    data: { query }
  })
);
