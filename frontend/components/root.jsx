import React from 'react';
import {Provider} from 'react-redux';
import App from './app';
import {Router, Route, hashHistory} from 'react-router';

const Root = ({store}) => {
  return (
    <Provider store={store} >
      <Router history={hashHistory} >
        <Route path="/" component={App} />
      </Router>
    </Provider>
  );
};

export default Root;
