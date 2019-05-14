import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Table from './Table'
import Add from './Add'
import View from './View'
import Edit from './Edit'
import Schedule from './Schedule'
import Salary from './Salary'

export class Employees extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={`${match.url}`} render={props => <Table {...props} base='/employees' />} />
        <Route path={`${match.url}/add`} render={props => <Add {...props} base='/employees' />} />
        <Route exact path={`${match.url}/:id`} render={props => <View {...props} base='/employees' />} />
        <Route exact path={`${match.url}/:id/edit`} render={props => <Edit {...props} base='/employees' />} />
        <Route path={`${match.url}/:id/edit/schedule`} component={Schedule} />
        <Route path={`${match.url}/:id/edit/salary`} component={Salary} />
      </Switch>
    )
  }
}

export default Employees
