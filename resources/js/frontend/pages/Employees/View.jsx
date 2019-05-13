import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Button from '../../components/Button'
import Form from './Form'

export class View extends Component {
  state = { isLoading: false }
  form = React.createRef()

  @autobind
  async refresh() {
    this.setState({ isLoading: true })
    await this.form.current.fetchData()
    this.setState({ isLoading: false })
  }

  render() {
    const { match } = this.props

    return (
      <>
        <div className='clearfix'>
          <h2 className='float-left'>View Employee</h2>
          <Button
            onClick={this.refresh}
            className='btn btn-primary btn-rounded btn-icon float-right'
            loading={this.state.isLoading}
          >
            <i className='fas fa-sync' />
          </Button>
        </div>
        <Link to={`${match.url}/edit`} className='btn btn-primary btn-rounded'>
          <i className='fas fa-edit' />
          Edit
        </Link>
        <Form wrappedComponentRef={this.form} type='view' />
      </>
    )
  }
}

export default withRouter(View)
