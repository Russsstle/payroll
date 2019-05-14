import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Breadcrumb from './components/Breadcrumb'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Leaves from './pages/Leaves'
import LeaveTypes from './pages/LeaveTypes'
import Attachments from './pages/Attachments'
import Schedules from './pages/Schedules'
import Salaries from './pages/Salaries'

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
      <>
        <Navbar userInfo={this.props.userInfo} refreshAuth={this.props.refreshAuth} />
        <div className='container pb-5'>
          {this.state.url != '/' && <Breadcrumb url={this.state.url} />}
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/employees' component={Employees} />
            <Route path='/leaves' component={Leaves} />
            <Route path='/leave_types' component={LeaveTypes} />
            <Route path='/attachments' component={Attachments} />
            <Route path='/schedules' component={Schedules} />
            <Route path='/salaries' component={Salaries} />
          </Switch>
        </div>
      </>
    )
  }
}

export default Router
