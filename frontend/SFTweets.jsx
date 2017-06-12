// frontend/SFTweets.jsx
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  Modal.setAppElement(document.body);

  injectTapEventPlugin();

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
