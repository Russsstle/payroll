import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Table from './Table'
import Add from './Add'
import View from './View'
import Edit from './Edit'

export class Leaves extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={`${match.url}`} render={props => <Table {...props} base='/leaves' />} />
        <Route path={`${match.url}/add`} render={props => <Add {...props} base='/leaves' />} />
        <Route exact path={`${match.url}/:id`} render={props => <View {...props} base='/leaves' />} />
        <Route path={`${match.url}/:id/edit`} render={props => <Edit {...props} base='/leaves' />} />
      </Switch>
    )
  }
}

export default Leaves
