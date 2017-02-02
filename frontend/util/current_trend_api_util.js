export const fetchCurrentTrends = () => (
  $.ajax({
    method: 'GET',
    url: 'api/trends',
  })
);
