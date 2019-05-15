import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import View from './View'
import Edit from './Edit'

export class Schedule extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route
          exact
          path={`/employees/:id/edit/schedule`}
          render={props => <View {...props} base={`/employees/${match.params.id}/edit/schedule`} />}
        />
        <Route
          path={`/employees/:id/edit/schedule/edit`}
          render={props => <Edit {...props} base={`/employees/${match.params.id}/edit/schedule`} />}
        />
      </Switch>
    )
  }
}

export default Schedule
