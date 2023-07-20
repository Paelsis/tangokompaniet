import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App';
import rootReducer from './redux/reducers/index'  // Import the reducers to be passed into the REDUX store
import './index.css'
import 'typeface-roboto'

export const store = createStore(rootReducer);     // Create the REDUX store

const rootEl = document.getElementById('root');

render(
    <Provider store={store}>
      <App />
    </Provider>
    , rootEl 
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}



/*
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
*/