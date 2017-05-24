import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import StreamContainer from '../../components/stream/stream_container';

const window = document.defaultView;
global.window = window
global.$ = require('jquery');

const stream = { 'tweets': [{ text: "I am a tweet" }] };
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore({
  stream: { stream }
});

describe('stream container', () => {
  let streamWrapper;

  describe('creating a new stream', () => {
    beforeEach(() => {
      streamWrapper = mount(
        <StreamContainer store={testStore} />
      ).find('Stream');
    });

    test('correctly maps dispatch to props', () => {
      expect(streamWrapper.props().fetchStream).toBeDefined();
      expect(streamWrapper.props().fetchStreamSince).toBeDefined();
      expect(streamWrapper.props().clearStream).toBeDefined();
    });

    test('stream component displays tweets in the store under the key `stream`', () => {
      expect(streamWrapper.props().stream).toEqual({ stream });
    });
  });
});
