import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Button from '../../core/components/Button'
import { parseForm } from '../../core/assets/Helper'
import { login, refreshAuth } from '../../core/assets/Auth'
import messages from '../strings/messages'

export class Login extends Component {
  state = {
    isLogging: false
  }

  @autobind
  async login(e) {
    e.preventDefault()

    this.setState({ isLogging: true })

    try {
      const { data } = await login(parseForm(e.target), this.props.type)
      localStorage.token = data.token
      refreshAuth()
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message)
      } else {
        alert(messages.SERVER_ERROR)
      }
    } finally {
      this.setState({ isLogging: false })
    }
  }

  render() {
    return (
      <div className='login'>
        <div className='wrapper fadeInDown'>
          <div id='formContent'>
            <div className='title fadeIn first'>
              <img src='/images/login-logo.png' alt='' />
            </div>
            <form onSubmit={this.login}>
              <input
                type='text'
                className='fadeIn second'
                name='username'
                placeholder='Username'
                autoFocus
                required
              />
              <input
                type='password'
                className='fadeIn third'
                name='password'
                placeholder='Password'
                required
              />
              <Button className='fadeIn fourth btnLogin' loading={this.state.isLogging}>
                Log In
              </Button>
            </form>
            <div id='formFooter'>
              <a className='underlineHover' href='#'>
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
