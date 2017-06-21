import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import SearchContainer from '../../components/search/search_container';

const window = document.defaultView;
global.window = window;
global.$ = require('jquery');

const state = {
  mapPosition: {
    lat: 37.9,
    lng: -122.5,
    radius: 42.99316579561581,
  },
  searchQuery: 'taco',
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testStore = mockStore({
  mapPosition: state.mapPosition,
  searchQuery: state.searchQuery,
});

describe('search container', () => {
  let searchWrapperRoot;
  let searchWrapper;
  let searchBody;
  let searchForm;

  describe('creating a new search', () => {
    beforeEach(() => {
      searchWrapperRoot = mount(<SearchContainer store={testStore} />);
      searchWrapper = searchWrapperRoot.find('Search');
      searchBody = searchWrapper.find('input');
      searchForm = searchWrapper.find('form');
    });

    test('correctly maps dispatch to props', () => {
      expect(searchWrapper.props().searchTweets).toBeDefined();
      expect(searchWrapper.props().setCurrentTweet).toBeDefined();
      expect(searchWrapper.props().setSearchQuery).toBeDefined();
    });

    test('pre-fills comment field with empty string', () => {
      expect(searchBody.props().value).toEqual('');
    });

    test('updates the rating field when it changes', () => {
      searchBody.simulate('change', { target: { value: 'potato' } });
      expect(searchBody.props().value).toEqual('potato');
    });

    test('search component has handleSubmit function', () => {
      searchForm.simulate('submit', { target: { value: 'potato' } });
      expect(searchWrapper.props().setCurrentTweet(null)).toEqual({
        tweet: null,
        type: 'SET_CURRENT_TWEET',
      });
      expect(searchWrapper.props().setSearchQuery('potato')).toEqual({
        query: 'potato',
        type: 'RECEIVE_SEARCH_QUERY',
      });
      const searchPromise = searchWrapper
        .props()
        .searchTweets('potato', searchWrapper.props().location);
      expect(typeof searchPromise.then).toEqual('function');
    });
  });
});
