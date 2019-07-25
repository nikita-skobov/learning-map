import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import ConnectedCanvas from './Canvas'
import Editor from './Editor'
import ConnectedLesson from './LessonModal'
import { SITE_NAME } from '../constants'
import { SiteTitle } from './SiteTitle'


function MapApp() {
  return (
    <div>
      <SiteTitle title={SITE_NAME} />
      <ConnectedLesson />
      <ConnectedCanvas />
    </div>
  )
}

export function App() {
  return (
    <div className="app-root">
      <Switch>
        <Route exact path="/" component={MapApp} />
        <Route exact path="/editor" component={Editor} />
      </Switch>
    </div>
  )
}


export default connect()(App)
