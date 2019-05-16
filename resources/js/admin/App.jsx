import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '../core/components/Navbar'
import Breadcrumb from '../core/components/Breadcrumb'
import Dashboard from '../core/pages/Dashboard'
import Employees from '../core/pages/Employees'
import Leaves from '../core/pages/Leaves'
import LeaveTypes from '../core/pages/LeaveTypes'
import Attachments from '../core/pages/Attachments'
import Schedules from '../core/pages/Schedules'
import Salaries from '../core/pages/Salaries'
import Attendances from '../core/pages/Attendances'
import EditProfile from '../core/pages/EditProfile'
import ChangePassword from '../core/pages/ChangePassword'

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
            <Route path='/attendances' component={Attendances} />
            <Route path='/edit_profile' component={EditProfile} />
            <Route path='/change_password' component={ChangePassword} />
          </Switch>
        </div>
      </>
    )
  }
}

export default Router
