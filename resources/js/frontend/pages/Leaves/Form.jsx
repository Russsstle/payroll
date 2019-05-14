import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'

import Api from '../../assets/Api'
import Loader from '../../components/Loader'

import messages from '../../strings/messages'

export class Form extends Component {
  state = {
    isLoading: this.props.type != 'add',
    leaveTypes: [],
    leave: {}
  }

  componentDidMount() {
    Waves.attach('.btn')

    this.fetchLeaveType()

    if (this.props.type == 'view' || this.props.type == 'edit') {
      this.fetchData()
    }
  }

  fetchData() {
    const leaves = new Api('leaves')
    leaves
      .find(this.props.match.params.id)
      .then(({ data }) => {
        this.setState({ isLoading: false, leave: data })
        if (this.props.type == 'view') {
          $('input, select').prop('disabled', true)
        }
      })
      .catch(() => {
        alert(messages.FETCH_LEAVE_FAIL)
      })
  }

  fetchLeaveType() {
    const leaveTypes = new Api('leaveTypes')
    leaveTypes
      .get()
      .then(({ data }) => {
        this.setState({ leaveTypes: data })
      })
      .catch(() => {
        alert(messages.FETCH_LEAVE_TYPE_FAIL)
      })
  }

  render() {
    const { onSubmit, type } = this.props
    const { leaveTypes, leave, isLoading } = this.state

    return isLoading ? (
      <Loader />
    ) : (
      <form className='mt-3' onSubmit={onSubmit}>
        <div className='row'>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Employee</label>
            <input
              type='text'
              className='form-control'
              name='name'
              defaultValue={leave.name}
              disabled={type == 'edit'}
              required
            />
          </div>
          <div className='form-group col'>
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
          <div className='w-100' />
          <div className='form-group col'>
            <label>Note</label>
            <input type='text' className='form-control' name='note' defaultValue={leave.note} required />
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Form</label>
            <input type='date' className='form-control' name='from' defaultValue={leave.from} />
          </div>
          <div className='form-group col'>
            <label>To</label>
            <input type='date' className='form-control' name='to' defaultValue={leave.to} />
          </div>
        </div>
        {this.props.children}
      </form>
    )
  }
}

export default withRouter(Form)
