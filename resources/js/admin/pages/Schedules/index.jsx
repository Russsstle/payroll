import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Table from './Table'
import View from './View'
import Edit from './Edit'

export class Schedules extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={`${match.url}`} render={props => <Table {...props} base='/schedules' />} />
        <Route exact path={`${match.url}/:id`} render={props => <View {...props} base='/schedules' />} />
        <Route path={`${match.url}/:id/edit`} render={props => <Edit {...props} base='/schedules' />} />
      </Switch>
    )
  }
}

export default Schedules
