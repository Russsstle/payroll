import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Typed from 'typed.js'

export class App extends Component {
  componentDidMount() {
    new Typed('.typed', {
      strings: [
        '<span style="font-size:24px">Welcome to Attendance System</span><br/><small>Please choose a mode.</small>'
      ],
      typeSpeed: 40
    })
  }

  render() {
    return (
      <div>
        <span className='typed' />
        <br />
        <br />
        <button className='btn btn-primary' onClick={() => this.props.history.push('barcode')}>
          Barcode
        </button>
        <button className='btn btn-primary' onClick={() => this.props.history.push('manual')}>
          Manual
        </button>
      </div>
    )
  }
}

export default withRouter(App)
