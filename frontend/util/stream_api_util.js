// frontend/util/stream_api_util.js
// @flow

export const fetchStreamSince = (timeNowUTC: number) =>
  $.ajax({
    method: 'GET',
    url: 'api/streams',
    data: { timeNowUTC },
  });
