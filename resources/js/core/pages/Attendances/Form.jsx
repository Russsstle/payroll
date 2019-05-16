import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'

import Api from '../../../core/assets/Api'
import Loader from '../../../core/components/Loader'
import { user } from '../../../core/assets/Auth'
import Map from '../../../core/components/Map'

import messages from '../../../core/strings/messages'

export class Form extends Component {
  id = this.props.match.params.id
  state = {
    isLoading: true,
    data: {}
  }

  async componentDidMount() {
    Waves.attach('.btn')

    if (this.props.type == 'view' || this.props.type == 'edit') {
      this.fetchData()
    }
  }

  async fetchData() {
    const attendance = new Api('attendances')
    try {
      const { data } = await attendance.find(this.id)
      this.setState({ isLoading: false, data })
      if (this.props.type == 'view') {
        $('form')
          .find('input, select')
          .prop('disabled', true)
      }
    } catch (err) {
      alert(messages.FETCH_FAIL)
      console.log(err)
    }
  }

  render() {
    const { onSubmit, type } = this.props
    const { isLoading, data } = this.state

    return isLoading ? (
      <Loader />
    ) : (
      <form className='mt-3' onSubmit={onSubmit}>
        <div className='row'>
          <div className='form-group col-4'>
            <label>Name</label>
            <input className='form-control' defaultValue={data.name} />
          </div>
          <div className='w-100' />
          <div className='form-group col-4'>
            <label>Status</label>
            <input className='form-control' defaultValue={data.status} />
          </div>
          <div className='w-100' />
          {data.latitude && (
            <div className='form-group col'>
              <label>Location</label>
              <Map marker={{ lat: data.latitude, lng: data.longitude }} />
            </div>
          )}
        </div>
        {this.props.children}
      </form>
    )
  }
}

export default withRouter(Form)
