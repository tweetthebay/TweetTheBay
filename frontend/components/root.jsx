// frontend/components/root.jsx
// @flow

import React from 'react';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import StreamContainer from './stream/stream_container.js';

const Root = ({ store }: { store: Object }) => (
  <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path='/' component={ App } >
        <Route path='/stream' component={ StreamContainer } />
      </Route>
    </Router>
  </Provider>
);

export default Root;
