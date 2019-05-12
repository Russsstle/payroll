import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Navbar from './components/Navbar'
import Breadcrumb from './components/Breadcrumb'

export class Router extends Component {
  state = {
    url: this.props.history.location.pathname
  }

  componentDidMount() {
    this.props.history.listen(location => {
      this.setState({ url: location.pathname })
    })
  }

  render() {
    return (
      <Fragment>
        <Navbar userInfo={this.props.userInfo} refreshAuth={this.props.refreshAuth} />
        <div className='container pb-5'>
          {this.state.url != '/' && <Breadcrumb url={this.state.url} />}
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
