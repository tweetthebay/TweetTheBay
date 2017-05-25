export const fetchStream = () => (
  $.ajax({
    method: 'GET',
    url: 'api/streams'
  })
);

export const fetchStreamSince = (timeNowUTC) => (
  $.ajax({
    method: 'GET',
    url: 'api/streams',
    data: { timeNowUTC }
  })
);
