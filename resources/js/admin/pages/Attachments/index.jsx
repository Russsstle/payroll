import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Table from './Table'
import Add from './Add'
import View from './View'
import Edit from './Edit'

export class Attachments extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={`${match.url}`} render={props => <Table {...props} base='/attachments' />} />
        <Route path={`${match.url}/add`} render={props => <Add {...props} base='/attachments' />} />
        <Route exact path={`${match.url}/:id`} render={props => <View {...props} base='/attachments' />} />
        <Route path={`${match.url}/:id/edit`} render={props => <Edit {...props} base='/attachments' />} />
      </Switch>
    )
  }
}

export default Attachments
