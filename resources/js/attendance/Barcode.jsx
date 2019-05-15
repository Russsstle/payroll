import React, { Component } from 'react'
import axios from 'axios'
import Moment from 'react-moment'

import Loader from '../components/Loader'

export class Barcode extends Component {
  state = { isLoading: false, data: null }

  componentDidMount() {
    let code = ''
    let reading = false
    $(document).on('keydown.barcode', e => {
      const textInput = e.key || String.fromCharCode(e.keyCode)
      const targetName = e.target.localName

      if (e.keyCode == 13) {
        this.setState({ isLoading: true })

        axios
          .post('/barcode', { code })
          .then(({ data }) => {
            this.setState({ data })
          })
          .catch(({ response }) => {
            if (response.code == 404) {
              return alert('Barcode not found.')
            }
            alert('Server Error.')
          })
          .finally(() => {
            this.setState({ isLoading: false })
          })
      } else if (textInput && textInput.length === 1 && targetName !== 'input') {
        code += textInput
      }

      if (!reading) {
        reading = true
        setTimeout(() => {
          code = ''
          reading = false
        }, 200)
      }
    })
  }

  componentWillUnmount() {
    $(document).unbind('keydown.barcode')
  }

  render() {
    const { isLoading, data } = this.state

    return (
      <>
        <h3>Point the scanner to the barcode.</h3>
        {isLoading ? (
          <Loader align='center' />
        ) : !data ? (
          <img src='/images/barcode-scanner.jpg' height='200' />
        ) : (
          <>
            <img src={data.avatar} height='200' />
            <br />
            <br />
            <h4 className='name'>{data.name}</h4>
            <div>
              {data.status == 'LOGGED_IN' ? 'Logged in' : 'Logged out'} at{' '}
              <Moment format='MMMM DD, YYYY hh:mm:ss A'>{data.timestamp}</Moment>
            </div>
          </>
        )}
      </>
    )
  }
}

export default Barcode
