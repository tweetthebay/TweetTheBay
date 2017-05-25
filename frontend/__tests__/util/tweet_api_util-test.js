/* globals jest */

import {
  searchTweets,
  fetchTweets
} from '../../util/tweet_api_util';

describe('the fetch current trends api util', () => {
  beforeEach(() => {
    global.$ = require.requireMock('jquery');
    global.$.ajax = jest.fn(options => "ajax promise");
  });

  afterEach(() => {
    global.$.ajax.mockClear();
  });

  it('searchTweets makes request and returns an ajax promise', () => {
    const query = "tacos"
    const location = "location"
    const returnValue = searchTweets(query, location);
    expect($.ajax).toBeCalled();

    // This line gets the first argument of the first call to $.ajax
    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('api/tweets');
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch('GET');
    expect(ajaxCallArg.data).toEqual({ query, location })
    expect(returnValue).toEqual("ajax promise");
  });

  it('fetchTweets makes request and returns an ajax promise', () => {
    const returnValue = fetchTweets();
    expect($.ajax).toBeCalled();

    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('api/tweets');
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch('GET');
    expect(returnValue).toEqual("ajax promise");
  });
});
