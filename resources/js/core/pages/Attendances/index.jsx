import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Table from './Table'
import View from './View'

export class Leaves extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={`${match.url}`} render={props => <Table {...props} base='/attendances' />} />
        <Route exact path={`${match.url}/:id`} render={props => <View {...props} base='/attendances' />} />
      </Switch>
    )
  }
}

export default Leaves
