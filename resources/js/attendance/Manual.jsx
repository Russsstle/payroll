import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import autobind from 'autobind-decorator'
import axios from 'axios'
import Moment from 'react-moment'

import Button from '../components/Button'

export class Manual extends Component {
  state = { isSubmitting: false, data: null }
  position = {}

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.position = position.coords
    })
  }

  @autobind
  async handleSubmit(e) {
    e.preventDefault()

    this.setState({ isSubmitting: true })

    const id = e.target[0]

    try {
      const { data } = await axios.post('/manual', {
        id: $(id).val(),
        latitude: this.position.latitude,
        longitude: this.position.longitude
      })
      $(id).val('')
      this.setState({ data })
    } catch (err) {
      if (err.response.status == 404) {
        return alert('ID not found.')
      }

      alert(err)
    } finally {
      this.setState({ isSubmitting: false })
    }
  }

  render() {
    const { isSubmitting, data } = this.state

    return (
      <>
        <h4>Manual Attendance</h4>
        <div className='text-left pt-3' style={{ clear: 'both' }}>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label>Employee ID</label>
              <input type='text' className='form-control' required />
            </div>
            <div className='form-group text-center'>
              <Link to='/' className='btn btn-light' disabled={isSubmitting}>
                Cancel
              </Link>
              <Button className='btn btn-primary' loading={isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
          {data && (
            <div className='text-center'>
              <h3 className='name'>{data.name}</h3>
              <div className='status'>
                {data.status == 'LOGGED_IN' ? 'Logged in' : 'Logged out'} at{' '}
                <Moment format='MMMM DD, YYYY hh:mm:ss A'>{data.timestamp}</Moment>
              </div>
              <a
                target='_blank'
                href={`https://www.google.com/maps/search/?api=1&query=${this.position.latitude},${
                  this.position.longitude
                }`}
              >
                Go to Location
              </a>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Manual
