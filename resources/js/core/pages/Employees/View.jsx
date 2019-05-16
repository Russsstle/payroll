import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Button from '../../../core/components/Button'
import Form from './Form'
import ModalSalary from '../../../core/components/ModalSalary'
import ModalLeaves from '../../../core/components/ModalLeaves'

export class View extends Component {
  id = this.props.match.params.id
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
        <button className='btn btn-primary btn-rounded' data-toggle='modal' data-target='#modalSalary'>
          <i className='fas fa-money-bill-alt' />
          Show Salary
        </button>
        <button className='btn btn-primary btn-rounded' data-toggle='modal' data-target='#modalLeaves'>
          <i className='fas fa-money-bill-alt' />
          Show Leaves
        </button>
        <br />
        <Link to={`${match.url}/edit`} className='btn btn-primary btn-rounded'>
          <i className='fas fa-edit' />
          Edit
        </Link>
        <Form wrappedComponentRef={this.form} type='view' />
        <ModalSalary id='modalSalary' data-id={this.id} />
        <ModalLeaves id='modalLeaves' data-id={this.id} />
      </>
    )
  }
}

export default withRouter(View)
