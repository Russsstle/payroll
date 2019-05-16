import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from '../core/components/Navbar'
import Breadcrumb from '../core/components/Breadcrumb'
import Dashboard from '../core/pages/Dashboard'
import Attachments from '../core/pages/Attachments'
import Leaves from '../core/pages/Leaves'

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
            <Route path='/attachments' component={Attachments} />
            <Route path='/leaves' component={Leaves} />
          </Switch>
        </div>
      </>
    )
  }
}

export default Router
