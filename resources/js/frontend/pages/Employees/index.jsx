import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Table from './Table'
import Add from './Add'
import View from './View'
import Edit from './Edit'

export class Employees extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={`${match.url}`} component={Table} />
        <Route path={`${match.url}/add`} component={Add} />
        <Route exact path={`${match.url}/:id`} component={View} />
        <Route path={`${match.url}/:id/edit`} component={Edit} />
      </Switch>
    )
  }
}

export default Employees
