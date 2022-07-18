import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Application from './Application';

import './index.scss';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <Application />
    </React.StrictMode>
  </Provider>
);
