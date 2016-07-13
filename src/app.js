import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';
reducers.routing = routerReducer;

import App from './components/App';

const store = createStore(combineReducers(reducers));
const history = syncHistoryWithStore(browserHistory, store);
const routes = (
  <Route path='/' component={App}>
  </Route>
);

function run() {
  let state = store.getState();
  console.log(state);
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes}>
      </Router>
    </Provider>,
     document.getElementById('root'));
}

run();

store.subscribe(run);
