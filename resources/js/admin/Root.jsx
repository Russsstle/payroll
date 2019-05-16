import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthProvider, AuthConsumer } from 'react-check-auth'

import Login from '../core/pages/Login'
import App from './App'
import { setUser, setRefreshAuth } from '../core/assets/Auth'

export class Root extends Component {
  constructor(props) {
    super(props)

    this.authUrl = $('base').attr('href') + '/auth'
    this.reqOptions = () => ({
      method: 'GET',
      headers: {
        Authorization: localStorage.token ? 'Bearer ' + localStorage.token : null
      }
    })
  }

  render() {
    return (
      <AuthProvider authUrl={this.authUrl} reqOptions={this.reqOptions}>
        <AuthConsumer>
          {({ isLoading, refreshAuth, userInfo, error }) => {
            setRefreshAuth(refreshAuth)
            setUser(userInfo)

            return isLoading || (!userInfo && !error) ? (
              <div className='loader'>
                <span className='spinner-border text-primary' />
              </div>
            ) : error ? (
              <Switch>
                <Route exact path='/login' render={props => <Login {...props} type='Admin' />} />
                <Redirect from='*' to='/login' />
              </Switch>
            ) : (
              <Switch>
                <Redirect from='/login' to='/' />
                <Route path='*' component={App} />
              </Switch>
            )
          }}
        </AuthConsumer>
      </AuthProvider>
    )
  }
}

export default Root
