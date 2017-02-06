import * as APIUtils from '../util/stream_api_util.js';

export const RECEIVE_STREAM = "RECEIVE_STREAM";
export const CLEAR_STREAM = "CLEAR_STREAM";
export const RECEIVE_STREAM_ERRORS = "RECEIVE_STREAM_ERRORS";

export const fetchStream = () => dispatch => (
  APIUtils.fetchStream().then(data => dispatch(receiveStream(data)),
    err => dispatch(receiveStreamErrors(err.responseJSON)))
);

export const fetchStreamSince = (timeNowUTC) => dispatch => (
  APIUtils.fetchStreamSince(timeNowUTC)
    .then(data => dispatch(receiveStream(data)),
    err => dispatch(receiveStreamErrors(err.responseJSON)))
);

export const receiveStream = (streamtweets) => ({
  type: RECEIVE_STREAM,
  streamtweets
});

export const clearStream = () => ({
  type: CLEAR_STREAM
});

export const receiveStreamErrors = errors => ({
  type: RECEIVE_STREAM_ERRORS,
  errors
});
