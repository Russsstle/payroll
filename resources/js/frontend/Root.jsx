import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthProvider, AuthConsumer } from 'react-check-auth'
import $ from 'jquery'

import Login from './pages/Login'
import App from './App'

export class Root extends Component {
  constructor(props) {
    super(props)

    this.authUrl = $('base').attr('href') + '/auth'
    this.reqOptions = () => ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.token ? 'Bearer ' + localStorage.token : null
      }
    })
  }

  checkAuth() {}

  render() {
    return (
      <AuthProvider authUrl={this.authUrl} reqOptions={this.reqOptions}>
        <AuthConsumer>
          {({ isLoading, error, refreshAuth }) =>
            isLoading ? (
              <div
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <img src='/images/loader.svg' alt='' />
              </div>
            ) : error ? (
              <Switch>
                <Route exact path='/login' render={props => <Login {...props} refreshAuth={refreshAuth} />} />
                <Redirect from='*' to='/login' />
              </Switch>
            ) : (
              <Switch>
                <Redirect from='/login' to='/' />
                <Route path='*' render={props => <App {...props} refreshAuth={refreshAuth} />} />
              </Switch>
            )
          }
        </AuthConsumer>
      </AuthProvider>
    )
  }
}

export default Root
