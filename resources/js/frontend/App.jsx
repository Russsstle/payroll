import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Navbar from './components/Navbar'

export class Router extends Component {
  render() {
    return (
      <Fragment>
        <Navbar refreshAuth={this.props.refreshAuth} />
        <div class='container mt-5'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/employees' component={Employees} />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default Router
