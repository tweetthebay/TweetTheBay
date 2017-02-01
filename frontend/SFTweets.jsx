import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import Modal from 'react-modal';
import { setMapPosition } from './actions/map_actions';

import injectTapEventPlugin from 'react-tap-event-plugin';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  store = configureStore();
  Modal.setAppElement(document.body);
  window.store = store;
  window.setMapPosition = setMapPosition;

  injectTapEventPlugin();

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);

  window.store = store;
});
