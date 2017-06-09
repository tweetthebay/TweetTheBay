// frontend/actions/stream_actions.js
// @flow

import * as APIUtils from '../util/stream_api_util';

export const RECEIVE_STREAM = 'RECEIVE_STREAM';
export const CLEAR_STREAM = 'CLEAR_STREAM';
export const RECEIVE_STREAM_ERRORS = 'RECEIVE_STREAM_ERRORS';

export const receiveStream = (streamtweets: Array<Object>) => ({
  type: RECEIVE_STREAM,
  streamtweets,
});

export const clearStream = () => ({
  type: CLEAR_STREAM,
});

export const receiveStreamErrors = (errors: ?Array<string>) => ({
  type: RECEIVE_STREAM_ERRORS,
  errors,
});

export const fetchStream = () => (dispatch: Function) =>
  APIUtils.fetchStream().then(
    data => dispatch(receiveStream(data)),
    err => dispatch(receiveStreamErrors(err.responseJSON)),
  );

export const fetchStreamSince = (timeNowUTC: number) => (dispatch: Function) =>
  APIUtils.fetchStreamSince(timeNowUTC).then(
    data => dispatch(receiveStream(data)),
    err => dispatch(receiveStreamErrors(err.responseJSON)),
  );
