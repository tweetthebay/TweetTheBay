// frontend/util/current_trend_api_util.js
// @flow

export const fetchCurrentTrends = () => (
  $.ajax({
    method: 'GET',
    url: 'api/trends',
  })
);
