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
      // console.log(this.state.users)
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
  @autobind
  async addAll() {
    const employees = new Api('users')
    try {
      const { data } = await employees.get()
      this.setState({
        selectedUsers: data
      })
      console.log(this.state.selectedUsers)
      // console.log(this.state.users)
    } catch {
      alert(messages.FETCH_FAIL)
    }
  }
  @autobind
  clear() {
    this.setState({
      selectedUsers: []
    })
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
                  <div className='row'>
                   
                    <div className='col-sm-12 col-md-4  '>
                      <button className='btn btn-primary btn-sm mt-1' onClick={this.addAll}>
                        Add All
                      </button>
                    </div>
                  </div>
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

              <div className='col-sm-12 col-md-6 '>
                <div className='mb-12'>
                  Selected Employees
                  <button className='btn btn-primary btn-sm mt-1 ' onClick={this.clear}>
                    Clear
                  </button>
                </div>
                <div style={{ height: '319px', overflowY: 'auto' }}>
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
              </div>
            </div>
            <div className='row' style={{ height: '1px', textAlign: 'right' }}>
              <div className='col-sm-12 col-md-6 ' />
              <div className='col-sm-12 col-md-6 '>
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
                    <button className='btn btn-primary  mt-0'>Generate</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
     
    )
  }
}

export default ModalAllFormsFilterV2
