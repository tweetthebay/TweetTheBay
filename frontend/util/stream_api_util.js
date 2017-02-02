export const fetchStream = () => (
  $.ajax({
    method: 'GET',
    url: '/api/streams'
  })
);
