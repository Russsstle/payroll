import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Api from '../../assets/Api'
import Form from './Form'
import messages from '../../strings/messages'
import Button from '../../components/Button'
import { parseForm } from '../../assets/Helper'
import { refreshAuth, userInfo } from '../../assets/Auth'

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
      if (this.id == userInfo.user.id) refreshAuth()
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
    return (
      <>
        <h2>Edit Employee</h2>
        <Form type='edit' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <Button className='btn btn-primary btn-rounded' loading={this.state.isSubmitting}>
              Save
            </Button>
            <button
              type='button'
              className='btn btn-light btn-rounded'
              onClick={() => {
                this.props.history.goBack()
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
