import * as APIUtils from '../util/current_trend_api_util.js';
export const RECEIVE_CURRENT_TRENDS = "RECEIVE_CURRENT_TRENDS";

export const fetchCurrentTrends = () => dispatch => (
  APIUtils.fetchCurrentTrends().then(data => dispatch(recieveCurrentTrends(data)))
);

const recieveCurrentTrends = currentTrends => ({
  type: RECEIVE_CURRENT_TRENDS,
  currentTrends
});
