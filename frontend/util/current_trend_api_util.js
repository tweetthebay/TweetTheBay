// frontend/util/current_trend_api_util.js
// @flow

// eslint-disable-next-line import/prefer-default-export
export const fetchCurrentTrends = () =>
  $.ajax({
    method: 'GET',
    url: 'api/trends',
  });
