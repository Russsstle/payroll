import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Button from '../components/Button'
import { parseForm } from '../assets/Helper'
import auth from '../assets/Auth'

export class Login extends Component {
  state = {
    isLogging: false
  }

  @autobind
  login(e) {
    e.preventDefault()

    this.setState({ isLogging: true })

    auth
      .login(parseForm(e.target))
      .then(({ data }) => {
        localStorage.token = data.token
        this.props.refreshAuth()
      })
      .catch(({ response }) => {
        alert(response.data.message)
      })
      .finally(() => {
        this.setState({ isLogging: false })
      })
  }

  render() {
    return (
      <div className='login'>
        <div className='wrapper fadeInDown'>
          <div id='formContent'>
            <div className='title fadeIn first'>
              <img src='https://static.thenounproject.com/png/2239854-200.png' alt='' />
            </div>
            <form onSubmit={this.login}>
              <input
                type='text'
                className='fadeIn second'
                name='username'
                placeholder='Username'
                autocomplete='off'
                required
              />
              <input
                type='password'
                className='fadeIn third'
                name='password'
                placeholder='Password'
                autocomplete='off'
                required
              />
              <Button className='fadeIn fourth btnLogin' status={this.state.isLogging ? 'loading' : ''}>
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
