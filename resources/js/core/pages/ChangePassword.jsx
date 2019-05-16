import React, { Component } from 'react'
import autobind from 'autobind-decorator'

import Axios from '../../core/assets/Axios'
import Button from '../../core/components/Button'
import messages from '../../core/strings/messages'
import { parseForm } from '../../core/assets/Helper'

export class ChangePassword extends Component {
  state = { isSubmitting: false }

  @autobind
  async handleSubmit(e) {
    e.preventDefault()

    if ($('input[name=newPassword]').val() != $('input[name=reenterNewPassword]').val()) {
      return alert('Password does not match!')
    }

    this.setState({ isSubmitting: true })

    const axios = new Axios()

    try {
      await axios.post('/change_password', parseForm(e.target))
      alert(messages.SAVED_SUCCESS)
      this.props.history.push('/')
    } catch (err) {
      console.log(err.response)
      if (err.response && err.response.status == 401) {
        return alert('Invalid Password.')
      }
      alert(messages.SERVER_ERROR)
    } finally {
      this.setState({ isSubmitting: false })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>Old Password</label>
          <input type='password' className='form-control col-4' name='oldPassword' />
        </div>
        <div className='form-group'>
          <label>New Password</label>
          <input type='password' className='form-control col-4' name='newPassword' />
        </div>
        <div className='form-group'>
          <label>Reenter new Password</label>
          <input type='password' className='form-control col-4' name='reenterNewPassword' />
        </div>
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
      </form>
    )
  }
}

export default ChangePassword
