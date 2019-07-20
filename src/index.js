/* global document */

import 'react-app-polyfill/ie9'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css'
import ReduxApp from './components/App'
import { createEnhancers, setupStore } from './setupStore'


const store = setupStore(
  createEnhancers([thunk]),
)

ReactDOM.render(
  <Provider store={store}>
    <ReduxApp />
  </Provider>,
  document.getElementById('root'),
)

// uncomment this if you use router
// ReactDOM.render(
//   <Provider store={store}>
//     <Router>
//       <Route path="/:filter?" component={ReduxApp} />
//     </Router>
//   </Provider>,
//   document.getElementById('root'),
// )
