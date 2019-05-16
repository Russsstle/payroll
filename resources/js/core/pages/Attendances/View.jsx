import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import Form from './Form'

export class View extends Component {
  render() {
    const { match } = this.props

    return (
      <div>
        <h2>View Attendance</h2>
        <Link to={`${match.url}/edit`} className='btn btn-primary btn-rounded'>
          <i className='fas fa-edit' />
          Edit
        </Link>
        <Form type='view' />
      </div>
    )
  }
}

export default withRouter(View)
