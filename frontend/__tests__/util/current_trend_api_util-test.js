/* globals jest */

import { fetchCurrentTrends } from '../../util/current_trend_api_util';

describe('the fetch current trends api util', () => {
  beforeEach(() => {
    global.$ = require.requireMock('jquery');
    global.$.ajax = jest.fn(options => "ajax promise");
  });

  afterEach(() => {
    global.$.ajax.mockClear();
  });

  it('fetchCurrentTrends makes request and returns an ajax promise', () => {
    const returnValue = fetchCurrentTrends();
    expect($.ajax).toBeCalled();

    // This line gets the first argument of the first call to $.ajax
    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toEqual('api/trends');
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch('GET');
    expect(returnValue).toEqual("ajax promise");
  });
});
