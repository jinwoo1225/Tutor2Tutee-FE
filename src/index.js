import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import store from './store'
import Navigation from './components/Navigation'

ReactDOM.render(
  <Provider store={store}>
    <Navigation />
    <App  />
  </Provider>
  ,
  document.getElementById('root')
);
