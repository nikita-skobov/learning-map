import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap'

import './App.css'
import ConnectedCanvas from './Canvas'
import Editor from './Editor'
import ConnectedLesson from './LessonModal'
import { SITE_NAME } from '../constants'
import { SiteTitle } from './SiteTitle'


function MapApp() {
  return (
    <div className="map-root">
      <NavLink to="/editor">
        <SiteTitle title={SITE_NAME} />
      </NavLink>
      <ConnectedLesson />
      <ConnectedCanvas />
    </div>
  )
}

function MainApp({ location }) {
  const {
    pathname,
  } = location

  let showComponent = <div>dsadsa</div>
  let editorIsActive = ''

  if (pathname === '/editor') {
    editorIsActive = 'active'
    showComponent = <Editor />
  }

  return (
    <div>
      <Navbar color="info" dark expand="md">
        <NavLink to="/">
          <span className="text-white navbar-brand">{SITE_NAME}</span>
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className={`nav-link ${editorIsActive}`} to="/editor">
              Editor
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/map">
              Map
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      {showComponent}
    </div>
  )
}

export function App() {
  return (
    <div className="app-root">
      <Switch>
        <Route exact path="/map" component={MapApp} />
        <Route path="/" component={MainApp} />
      </Switch>
    </div>
  )
}


export default connect()(App)
