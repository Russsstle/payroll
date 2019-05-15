import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Api from '../../../assets/Api'
import Form from './Form'
import messages from '../../../strings/messages'
import Button from '../../../components/Button'
import { parseForm } from '../../../assets/Helper'
import { refreshAuth, user as userInfo } from '../../../assets/Auth'

export class Edit extends Component {
  id = this.props.match.params.id
  state = { isSubmitting: false }

  @autobind
  async handleSubmit(e) {
    e.preventDefault()

    this.setState({ isSubmitting: true })

    const user = new Api('users')
    try {
      await user.update(this.id, parseForm(e.target))
      console.log(userInfo)
      if (this.id == userInfo.id) refreshAuth()
      alert(messages.SAVED_SUCCESS)
      this.props.history.push(this.props.base)
    } catch (err) {
      console.log(err)
      alert(messages.SERVER_ERROR)
    } finally {
      this.setState({ isSubmitting: false })
    }
  }

  render() {
    const { base, history } = this.props

    return (
      <>
        <h2>Edit Employee</h2>
        <Link to={`${base}/${this.id}/edit/salary/edit`} className='btn btn-primary btn-rounded'>
          <i className='fas fa-money-bill-alt' />
          Edit Salary
        </Link>
        <Link to={`${base}/${this.id}/edit/schedule/edit`} className='btn btn-primary btn-rounded'>
          <i className='fas fa-calendar-alt' />
          Edit Schedule
        </Link>
        <Form type='edit' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <Button className='btn btn-primary btn-rounded' loading={this.state.isSubmitting}>
              Save
            </Button>
            <button
              type='button'
              className='btn btn-light btn-rounded'
              onClick={() => {
                history.goBack()
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      </>
    )
  }
}

export default withRouter(Edit)
