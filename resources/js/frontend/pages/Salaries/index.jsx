import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Table from './Table'
import View from './View'
import Edit from './Edit'

export class Salaries extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={`${match.url}`} render={props => <Table {...props} base='/salaries' />} />
        <Route exact path={`${match.url}/:id`} render={props => <View {...props} base='/salaries' />} />
        <Route path={`${match.url}/:id/edit`} render={props => <Edit {...props} base='/salaries' />} />
      </Switch>
    )
  }
}

export default Salaries
