// frontend/actions/current_trend_actions.js
// @flow

import * as APIUtils from '../util/current_trend_api_util.js';

export const RECEIVE_CURRENT_TRENDS = "RECEIVE_CURRENT_TRENDS";

export const fetchCurrentTrends = () => (dispatch: Function) => (
  APIUtils.fetchCurrentTrends()
    .then(data => dispatch(receiveCurrentTrends(data)))
);

export const receiveCurrentTrends = (currentTrends: Object) => ({
  type: RECEIVE_CURRENT_TRENDS,
  currentTrends
});
