import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'

import Api from '../../../../assets/Api'
import Loader from '../../../../components/Loader'

import messages from '../../../../strings/messages'

export class Form extends Component {
  id = this.props.match.params.id
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  state = {
    isLoading: true,
    schedule: {}
  }

  componentDidMount() {
    console.log(this.props)
    Waves.attach('.btn')

    if (this.props.type == 'view' || this.props.type == 'edit') {
      this.fetchData()
    }
  }

  async fetchData() {
    const schedule = new Api('schedules')

    try {
      const { data } = await schedule.find(this.id)
      this.setState({ isLoading: false, schedule: data })
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
    const { schedule, isLoading } = this.state

    return isLoading ? (
      <Loader />
    ) : (
      <form className='mt-3' onSubmit={onSubmit}>
        <input type='hidden' name='user_id' defaultValue={this.id} />
        <div className='row w-50'>
          {this.days.map((day, key) => (
            <>
              <div key={key} className='form-group col'>
                <label>{day}</label>
                <br />
                <div className='row m-0'>
                  <input
                    type='time'
                    className='form-control col-5'
                    name={day.toLowerCase() + '_from'}
                    defaultValue={schedule[day.toLowerCase()].from}
                  />
                  <span className='col-1 time-dash'>-</span>
                  <input
                    type='time'
                    className='form-control col-5'
                    name={day.toLowerCase() + '_to'}
                    defaultValue={schedule[day.toLowerCase()].to}
                  />
                </div>
              </div>
              <div className='w-100' />
            </>
          ))}
        </div>
        {this.props.children}
      </form>
    )
  }
}

export default withRouter(Form)
