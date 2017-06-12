/* globals jest */

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as StreamApiUtil from '../../util/stream_api_util';
import {
  RECEIVE_STREAM,
  RECEIVE_STREAM_ERRORS,
  CLEAR_STREAM,
  receiveStream,
  receiveStreamErrors,
  clearStream,
  fetchStream,
  fetchStreamSince,
} from '../../actions/stream_actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('stream actions', () => {
  describe('stream constants', () => {
    it('should contain a RECEIVE_STREAM constant', () => {
      expect(RECEIVE_STREAM).toEqual('RECEIVE_STREAM');
    });

    it('should contain a RECEIVE_STREAM_ERRORS constant', () => {
      expect(RECEIVE_STREAM_ERRORS).toEqual('RECEIVE_STREAM_ERRORS');
    });

    it('should contain a CLEAR_STREAM constant', () => {
      expect(CLEAR_STREAM).toEqual('CLEAR_STREAM');
    });
  });

  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ stream: {} });
    });

    describe('receiveStream', () => {
      it('should have a type of RECEIVE_STREAM', () => {
        expect(receiveStream().type).toEqual(RECEIVE_STREAM);
      });

      it('should pass on the streamtweets we pass in', () => {
        const streamtweets = {
          tweets: [
            {
              text: 'Tacos. Tacos. Tacos!',
              screenName: 'tacoFan',
            },
            {
              text: 'Eating burritos until life makes more sense',
              screenName: 'burritoGuy',
            },
          ],
        };

        expect(receiveStream(streamtweets).streamtweets).toEqual(streamtweets);
      });

      it('should pass on the streamtweets we pass in (with mock store)', () => {
        const streamtweets = {
          tweets: [
            {
              text: 'Tacos. Tacos. Tacos!',
              screenName: 'tacoFan',
            },
            {
              text: 'Eating burritos until life makes more sense',
              screenName: 'burritoGuy',
            },
          ],
        };

        const expectedActions = [
          {
            type: RECEIVE_STREAM,
            streamtweets,
          },
        ];

        store.dispatch(receiveStream(streamtweets));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('receiveStreamErrors', () => {
      it('should have a type of RECEIVE_STREAM_ERRORS', () => {
        expect(receiveStreamErrors().type).toEqual(RECEIVE_STREAM_ERRORS);
      });

      it('should pass on the errors we pass in', () => {
        const errors = {
          errors: ['I am an error', 'I am also an error'],
        };

        expect(receiveStreamErrors(errors).errors).toEqual(errors);
      });

      it('should pass on the errors we pass in (with mock store)', () => {
        const errors = {
          errors: ['I am an error', 'I am also an error'],
        };

        const expectedActions = [
          {
            type: RECEIVE_STREAM_ERRORS,
            errors,
          },
        ];

        store.dispatch(receiveStreamErrors(errors));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('clearStream', () => {
      it('should have a type of CLEAR_STREAM', () => {
        expect(clearStream().type).toEqual(CLEAR_STREAM);
      });

      it('mock store should receive CLEAR_STREAM action', () => {
        const expectedActions = [
          {
            type: CLEAR_STREAM,
          },
        ];

        store.dispatch(clearStream());
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('thunks', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ stream: {} });
    });

    describe('fetchStream', () => {
      it('should export a fetchStream function', () => {
        expect(typeof fetchStream).toEqual('function');
      });

      it('dispatches RECEIVE_STREAM when streamtweets have been fetched', () => {
        const streamtweets = {
          tweets: [
            {
              text: 'Tacos. Tacos. Tacos!',
              screenName: 'tacoFan',
            },
            {
              text: 'Eating burritos until life makes more sense',
              screenName: 'burritoGuy',
            },
          ],
        };

        StreamApiUtil.fetchStream = jest.fn(() => Promise.resolve(streamtweets));

        const expectedActions = [
          {
            type: RECEIVE_STREAM,
            streamtweets,
          },
        ];

        return store.dispatch(fetchStream()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('fetchStreamSince', () => {
      it('should export a fetchStreamSince function', () => {
        expect(typeof fetchStreamSince).toEqual('function');
      });

      it('dispatches RECEIVE_STREAM when streamtweets have been fetched', () => {
        const time = Date.now();

        const streamtweets = {
          tweets: [
            {
              text: 'Tacos. Tacos. Tacos!',
              screenName: 'tacoFan',
            },
            {
              text: 'Eating burritos until life makes more sense',
              screenName: 'burritoGuy',
            },
          ],
        };

        StreamApiUtil.fetchStreamSince = jest.fn(time => Promise.resolve(streamtweets));

        const expectedActions = [
          {
            type: RECEIVE_STREAM,
            streamtweets,
          },
        ];

        return store.dispatch(fetchStreamSince(time)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });
});
