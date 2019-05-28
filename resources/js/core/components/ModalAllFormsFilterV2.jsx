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
    const { selectedUsers } = this.state

    selectedUsers.splice(id, 1)

    this.setState({ selectedUsers })
  }

  async selectEmployee(userID) {
    const employees = new Api('users')
    try {
      const { data } = await employees.find(userID)
      this.setState(prevState => ({
        selectedUsers: [...prevState.selectedUsers, data]
      }))
      console.log(this.state.selectedUsers)
      // console.log(this.state.users)
    } catch {
      alert(messages.FETCH_FAIL)
    }
  }
  searchEmployee(e) {
    alert('sad')
  }

  render() {
    return (
      <Modal
        id={this.props.id}
        ref={this.modal}
        width='70%'
        title={
          this.props.name == 'bir'
            ? 'For BIR Form:'
            : this.props.name == 'erf'
            ? 'For Employee Remittance Form:'
            : this.props.name == 'mrf'
            ? 'For Membership Remittance Form:'
            : ''
        }
      >
        <div className='modal-body row-height'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-12 col-md-6  '>
                <div style={{ marginBottom: 12 }}>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    placeholder='Search Employee/s'
                    autoComplete='off'
                    onChange={e => {
                      this.searchEmployee(e)
                    }}
                    required
                  />
                  {/* <form target='_blank' action={'generate/' + this.props.name} method='POST' className='mt-3'>
                    <input
                      type='hidden'
                      name='_token'
                      defaultValue={$('meta[name=csrf-token]').attr('content')}
                    />
                    {this.state.selectedUsers.map((item, key) => (
                      <input key={key} type='hidden' name='employee[]' value={item.id} />
                    ))}

                    <div className='form-group'>
                      <button className='btn btn-primary'>Generate</button>
                    </div>
                  </form> */}
                </div>
                <div style={{ height: '310px', overflowY: 'auto' }}>
                  <ul className='list-group'>
                    {this.state.users.map(
                      (user, key) =>
                        _.findIndex(this.state.selectedUsers, x => x.id == user.id) == -1 && (
                          <a className='btn-delete ' onClick={() => this.selectEmployee(user.id)}>
                            <li key={key} className='list-group-item'>
                              {user.name}
                            </li>
                          </a>
                        )
                    )}
                  </ul>
                </div>
              </div>

              <div className='col-sm-12 col-md-6  ' style={{ height: '370px', overflowY: 'auto' }}>
                Selected Employees
                <ul className='list-group'>
                  {this.state.selectedUsers.map((selectedUser, key) => (
                    <li key={key} className='list-group-item'>
                      {selectedUser.name}
                      <a className='btn-delete float-right' onClick={() => this.deleteEmployee(key)}>
                        <i className='fas fa-times' />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <form
                target='_blank'
                action={'generate/' + this.props.name}
                method='POST'
                style={{ marginLeft: '10px' }}
              >
                <input
                  type='hidden'
                  name='_token'
                  defaultValue={$('meta[name=csrf-token]').attr('content')}
                />
                {this.state.selectedUsers.map((item, key) => (
                  <input key={key} type='hidden' name='employee[]' value={item.id} />
                ))}

                <div className='form-group'>
                  <button className='btn btn-primary '>Generate</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ModalAllFormsFilterV2
