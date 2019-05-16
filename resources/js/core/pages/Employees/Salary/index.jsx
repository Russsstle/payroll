import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import View from './View'
import Edit from './Edit'

export class Salary extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route
          exact
          path={`/employees/:id/edit/salary`}
          render={props => <View {...props} base={`/employees/${match.params.id}/edit/salary`} />}
        />
        <Route
          path={`/employees/:id/edit/salary/edit`}
          render={props => <Edit {...props} base={`/employees/${match.params.id}/edit/salary`} />}
        />
      </Switch>
    )
  }
}

export default Salary
