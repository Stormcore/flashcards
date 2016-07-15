/* jshint esversion: 6 */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import * as reducers from './reducers'
reducers.routing = routerReducer

import App from './components/App'
import VisibleCards from './components/VisibleCards'
import NewCardModal from './components/NewCardModal'
import EditCardModal from './components/EditCardModal'
import StudyModal from './components/StudyModal'

import * as localStorage from './localStorage'

const store = createStore(combineReducers(reducers), localStorage.get())
const history = syncHistoryWithStore(browserHistory, store)
const routes = (
  <Route path='/' component={App}>
    <Route path='/deck/:deckId' component={VisibleCards}>
      <Route path='/deck/:deckId/new' component={NewCardModal} />
      <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />
      <Route path='/deck/:deckId/study' component={StudyModal} />
    </Route>
  </Route>
)

function run () {
  let state = store.getState()
  localStorage.set(state, ['decks', 'cards'])

  console.log(state)
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
     document.getElementById('root')
   )
}

run()

store.subscribe(run)
