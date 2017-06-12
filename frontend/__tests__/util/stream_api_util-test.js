/* globals jest */

import { fetchStream, fetchStreamSince } from '../../util/stream_api_util';

describe('the stream api util', () => {
  beforeEach(() => {
    global.$ = require.requireMock('jquery');
    global.$.ajax = jest.fn(() => 'ajax promise');
  });

  afterEach(() => {
    global.$.ajax.mockClear();
  });

  it('fetchStream makes request and returns an ajax promise', () => {
    const returnValue = fetchStream();
    expect($.ajax).toBeCalled();

    // This line gets the first argument of the first call to $.ajax
    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('api/streams');
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch('GET');
    expect(returnValue).toEqual('ajax promise');
  });

  it('fetchStreamSince makes request and returns an ajax promise', () => {
    const timeNowUTC = Date.now();
    const returnValue = fetchStreamSince(timeNowUTC);
    expect($.ajax).toBeCalled();

    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('api/streams');
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch('GET');
    expect(ajaxCallArg.data).toEqual({ timeNowUTC });
    expect(returnValue).toEqual('ajax promise');
  });
});
