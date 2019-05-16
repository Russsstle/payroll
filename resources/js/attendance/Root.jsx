import React, { Component } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import App from './App'
import Barcode from '../core/pages/Barcode'
import Manual from '../core/pages//Manual'

export class Root extends Component {
  state = { mode: null }

  componentDidMount() {
    Waves.attach('.btn')
    $('.card').show(() => {
      this.setState({ mode: 'choice' })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mode != this.state.mode) {
      Waves.attach('.btn')
      $('.animated').show()

      if (prevState.mode == 'choice') {
        $('.typed-cursor').remove()
      }
    }
  }

  render() {
    const { mode } = this.state

    return (
      <div className='attendance'>
        <div className='card animated zoomIn'>
          <div className='card-body text-center'>
            <Switch>
              <Route exact path='/' component={App} />
              <Route path='/barcode' component={Barcode} />
              <Route path='/manual' component={Manual} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default Root
