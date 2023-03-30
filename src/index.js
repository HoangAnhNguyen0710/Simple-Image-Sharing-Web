import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/dist/output.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './config/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

