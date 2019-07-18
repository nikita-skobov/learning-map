import React from 'react'
import { connect } from 'react-redux'
// import { Route, Switch } from 'react-router-dom'

import './App.css'
import ConnectedCanvas from './Canvas'

export function App() {
  return (
    <div>
      <ConnectedCanvas />
    </div>
  )
}

// export function App() {
//   return (
//     <div className="app-root">
//       <Route path="/" component={ConnectedNavBar} />
//       <Route path="/" component={ConnectedPageList} />
//       <Switch>
//         <Route exact path={} component={ConnectedList} />
//         <Route path={} component={ConnectedRepo} />
//       </Switch>
//     </div>
//   )
// }


export default connect()(App)
