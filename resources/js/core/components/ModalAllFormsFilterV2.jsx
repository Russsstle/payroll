import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import messages from '../../core/strings/messages'
import Modal from './Modal'
import Api from '../../core/assets/Api'

export class ModalAllFormsFilterV2 extends Component {
  modal = React.createRef()
  state = { name: '', users: [], selectedUsers: [] }

  componentDidMount() {
    this.fetchUser()
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

  deleteEmployee(id) {
    const { employees } = this.state

    employees.splice(id, 1)

    this.setState({ employees })
  }

  render() {
    return (
      <Modal id={this.props.id} ref={this.modal} width='70%' title='Select Range'>
        <div className='modal-body row-height'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-12 col-md-6  '>
                <div style={{ marginBottom: 12 }}>
                  For BIR Form
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    placeholder='Select Employee/s'
                    autoComplete='off'
                    // onKeyDown={this.addEmployee}
                    required
                  />
                  <div className='form-group'>
                    <button className='btn btn-primary'>Generate</button>
                  </div>
                </div>
                <div>Selected Employees</div>
              </div>

              <div className='col-sm-12 col-md-6 scrollable  '>
                Employees
                <ul className='list-group'>
                  {this.state.users.map((user, key) => (
                    <li key={key} className='list-group-item'>
                      {user.name}
                      <a className='btn-delete float-right' onClick={() => this.deleteEmployee(key)}>
                        <i className='fas fa-times' />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ModalAllFormsFilterV2
