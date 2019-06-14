import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'

import Api from '../../../core/assets/Api'
import Loader from '../../../core/components/Loader'
import { user } from '../../../core/assets/Auth'

import messages from '../../../core/strings/messages'

export class Form extends Component {
  id = this.props.match.params.id
  state = {
    isLoading: this.props.type != 'add',
    leaveTypes: [],
    leave: {},
    users: []
  }

  async componentDidMount() {
    Waves.attach('.btn')

    await Promise.all([this.fetchLeaveType(), this.fetchUser()])

    if (this.props.type == 'view' || this.props.type == 'edit') {
      await this.fetchData()
    }
    const b = new Date()
    var mydate = new Date('2019-05-29')
    var a = $('.datepicker-here')
      .datepicker({
        position: 'top left',
        multipleDates: true,
        multipleDatesSeparator: ' | ',
        inline: true
      })
      .data('datepicker')
    a.selectDate(mydate)
    a.selectDate(b)
    console.log(b)
  }

  async fetchData() {
    const leave = new Api('leaves')
    try {
      const { data } = await leave.find(this.id)
      this.setState({ isLoading: false, leave: data })
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

  async fetchLeaveType() {
    const leaveTypes = new Api('leave_types')
    try {
      const { data } = await leaveTypes.get()

      this.setState({ leaveTypes: data })
    } catch {
      alert(messages.FETCH_FAIL)
    }
  }

  async fetchUser() {
    const users = new Api('users')
    try {
      const { data } = await users.get()

      this.setState({ users: data })
    } catch {
      alert(messages.FETCH_FAIL)
    }
  }

  render() {
    const { onSubmit, type } = this.props
    const { leaveTypes, leave, isLoading, users } = this.state

    return isLoading ? (
      <Loader />
    ) : (
      <form className='mt-3' onSubmit={onSubmit}>
        <div className='row'>
          <div className='w-100' />
          {user.type == 'Admin' && (
            <div className='form-group col'>
              <input type='hidden' name='user_id' disabled={type == 'add'} value={leave.user_id} />
              <label>Employee</label>
              <select
                className='custom-select'
                name='user_id'
                defaultValue={leave.user_id}
                disabled={type == 'edit'}
                required
              >
                <option />
                {users.map((user, key) => (
                  <option key={key} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <div className='form-group '>
                <label>Type</label>
                <select
                  className='custom-select'
                  name='leave_type_id'
                  defaultValue={leave.leave_type_id}
                  required
                >
                  <option />
                  {leaveTypes.map((leaveType, key) => (
                    <option key={key} value={leaveType.id}>
                      {leaveType.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group '>
                <label>Note</label>
                <textarea
                  className='form-control'
                  name='note'
                  disabled={type == 'view'}
                  defaultValue={leave.note}
                  rows='5'
                />
              </div>
            </div>
          )}

          <div className='form-group col'>
            <div className='pl-10'>
              <label>Date/s</label>
              <input
                type='hidden'
                className='form-control datepicker-here'
                data-language='en'
                name='dates'
                autoComplete='off'
              />
            </div>
          </div>

          {/* <div className='w-100' />
          <div className='form-group col'>
            <label>Note</label>
            <textarea
              className='form-control'
              name='note'
              disabled={type == 'view'}
              defaultValue={leave.note}
              rows='5'
            />
          </div>
          <div className='w-100' /> */}
          {/* <div className='form-group col'>
            <label>From</label>
            <input type='date' className='form-control' name='from' defaultValue={leave.from} />
          </div>
          <div className='form-group col'>
            <label>To</label>
            <input type='date' className='form-control' name='to' defaultValue={leave.to} />
          </div> */}
        </div>
        {this.props.children}
      </form>
    )
  }
}

export default withRouter(Form)
