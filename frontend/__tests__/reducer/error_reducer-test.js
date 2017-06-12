/* globals jest */

import ErrorReducer from '../../reducers/error_reducer';

describe('Reducers', () => {
  describe('ErrorReducer', () => {
    // eslint-disable-next-line no-underscore-dangle
    const _oldState = {
      errors: ['I am an error', 'I am also an error'],
    };

    it('exports an function', () => {
      expect(typeof ErrorReducer).toEqual('function');
    });

    it('should initialize with an empty object as the default state', () => {
      expect(ErrorReducer(undefined, {})).toEqual({});
    });

    it('should return the previous state if an action is not matched', () => {
      const newState = ErrorReducer(_oldState, { type: 'notAType' });
      expect(newState).toEqual(_oldState);
    });

    describe('handling the RECEIVE_TWEET_ERRORS action', () => {
      let errors;
      let errorsAction;

      beforeEach(() => {
        errors = {
          errors: ['Error #1', 'Error #2'],
        };

        errorsAction = {
          type: 'RECEIVE_TWEET_ERRORS',
          errors,
        };
      });

      it("should replace the state with the action's errors", () => {
        const state = ErrorReducer(undefined, errorsAction);
        expect(state).toEqual(errors);
      });

      it('should not modify the old state', () => {
        const oldState = {
          errors: ['I am an error', 'I am also an error'],
        };

        ErrorReducer(oldState, errorsAction);
        expect(oldState).toEqual(_oldState);
      });
    });
  });
});
