import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'

import Api from '../../assets/Api'
import Loader from '../../components/Loader'

import messages from '../../strings/messages'

export class Form extends Component {
  id = this.props.match.params.id
  state = {
    isLoading: this.props.type != 'add',
    leaveType: {},

    isChecked: false
  }

  componentDidMount() {
    Waves.attach('.btn')

    if (this.props.type == 'view' || this.props.type == 'edit') {
      this.fetchData()
    }
  }

  async fetchData() {
    const leaveTypes = new Api('leave_types')
    try {
      const { data } = await leaveTypes.find(this.id)
      this.setState({ isLoading: false, leaveType: data })
      if (this.props.type == 'view') {
        $('form')
          .find('input, select')
          .prop('disabled', true)
      }
    } catch {
      alert(messages.FETCH_LEAVETYPE_FAIL)
    }
  }

  render() {
    const { onSubmit } = this.props
    const { leaveType, isLoading, isChecked } = this.state

    return isLoading ? (
      <Loader />
    ) : (
      <form className='mt-3' onSubmit={onSubmit}>
        <div className='row'>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Name</label>
            <input type='text' className='form-control' name='name' defaultValue={leaveType.name} />
          </div>
          <div className='form-group col'>
            <label>Paid</label>
            <input type='checkbox' className='form-control' name='paid' defaultChecked={leaveType.paid} />
          </div>
        </div>
        {this.props.children}
      </form>
    )
  }
}

export default withRouter(Form)
