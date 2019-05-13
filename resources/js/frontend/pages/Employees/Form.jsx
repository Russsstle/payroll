import React, { Component } from 'react'
import { Prompt } from 'react-router-dom'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'

import Api from '../../assets/Api'
import Loader from '../../components/Loader'

import nationalities from '../../strings/nationalities'
import civilstatus from '../../strings/civilstatus'
import messages from '../../strings/messages'

export class Form extends Component {
  form = React.createRef()
  state = {
    isLoading: this.props.type != 'add',
    avatar: {},
    roles: [],
    user: { profile: {} }
  }

  componentDidMount() {
    Waves.attach('.btn')

    this.fetchRoles()

    if (this.props.type == 'view' || this.props.type == 'edit') {
      this.fetchData()
    }
  }

  async fetchData() {
    this.setState({ isLoading: true })

    const users = new Api('users')
    try {
      const { data } = await users.find(this.props.match.params.id)
      this.setState({ isLoading: false, user: data, avatar: { url: data.avatar } })

      if (this.props.type == 'view') {
        $('input, select').prop('disabled', true)
      }
    } catch (err) {
      alert(messages.FETCH_PROFILE_FAIL)
      console.log(err)
    }
  }

  async fetchRoles() {
    const roles = new Api('roles')

    try {
      const { data } = await roles.get()
      this.setState({ roles: data })
    } catch (err) {
      console.log(err)
      alert(messages.FETCH_ROLES_FAIL)
    }
  }

  @autobind
  handleAvatarChange(e) {
    const file = e.target.files[0]

    this.setState({ avatar: { url: URL.createObjectURL(file), name: file.name } })
  }

  render() {
    const { onSubmit, type } = this.props
    const { avatar, roles, user, isLoading } = this.state

    return isLoading ? (
      <Loader />
    ) : (
      <form ref={this.form} className='mt-3' onSubmit={onSubmit}>
        <Prompt when={type != 'view'} message='Unsaved Changes?' />
        <div className='row'>
          <div className='form-group col-4'>
            <img
              className='img-thumbnail'
              style={{ minHeight: 150 }}
              src={
                avatar.url ||
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII='
              }
              alt=''
            />
            {type != 'view' && (
              <div className='custom-file mt-2'>
                <input
                  type='file'
                  className='custom-file-input'
                  id='avatar'
                  name='avatar'
                  onChange={this.handleAvatarChange}
                />
                <label className='custom-file-label' htmlFor='avatar'>
                  {avatar.name || 'Upload Image'}
                </label>
              </div>
            )}
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Username</label>
            <input
              type='text'
              className='form-control'
              name='username'
              defaultValue={user.username}
              disabled={type == 'edit'}
              required
            />
          </div>
          <div className='form-group col'>
            <label>Role Name</label>
            <select className='custom-select' name='role_id' defaultValue={user.role_id} required>
              <option />
              {roles.map((role, key) => (
                <option key={key} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>First Name</label>
            <input
              type='text'
              className='form-control'
              name='first_name'
              defaultValue={user.first_name}
              required
            />
          </div>
          <div className='form-group col'>
            <label>Middle Name</label>
            <input type='text' className='form-control' name='middle_name' defaultValue={user.middle_name} />
          </div>
          <div className='form-group col'>
            <label>Last Name</label>
            <input
              type='text'
              className='form-control'
              name='last_name'
              defaultValue={user.last_name}
              required
            />
          </div>
          <div className='w-100' />
          {type != 'view' && (
            <div className='form-group col'>
              <label>Password</label>
              <input type='password' className='form-control' name='password' required={type == 'add'} />
            </div>
          )}
          <div className='w-100' />
          <div className='form-group col'>
            <label>Gender</label>
            <br />
            <div className='custom-control custom-radio custom-control-inline'>
              <input
                id='male'
                type='radio'
                className='custom-control-input'
                name='gender'
                value='Male'
                defaultChecked={!user.gender || user.gender == 'Male'}
              />
              <label htmlFor='male' className='custom-control-label'>
                Male
              </label>
            </div>
            <div className='custom-control custom-radio custom-control-inline'>
              <input id='female' type='radio' className='custom-control-input' name='gender' value='Female' />
              <label
                htmlFor='female'
                className='custom-control-label'
                defaultChecked={user.gender == 'Female'}
              >
                Female
              </label>
            </div>
          </div>
          <div className='form-group col'>
            <label>Birthday</label>
            <input type='date' className='form-control' name='birthday' defaultValue={user.birthday} />
          </div>
          <div className='form-group col'>
            <label>Civil Status</label>
            <select className='custom-select' name='civil_status' defaultValue={user.civil_status || -1}>
              <option />
              {civilstatus.map((item, key) => (
                <option key={key}>{item}</option>
              ))}
            </select>
          </div>
          <div className='form-group col'>
            <label>Nationality</label>
            <select className='custom-select' name='nationality' defaultValue={user.nationality || -1}>
              <option />
              {nationalities.map((item, key) => (
                <option key={key}>{item}</option>
              ))}
            </select>
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Address</label>
            <input type='text' className='form-control' name='address' defaultValue={user.address} />
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Email Address</label>
            <input type='text' className='form-control' name='email' defaultValue={user.email} />
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Mobile Number</label>
            <input
              type='text'
              className='form-control'
              name='mobile_number'
              defaultValue={user.mobile_number}
            />
          </div>
          <div className='form-group col'>
            <label>Telephone Number</label>
            <input
              type='text'
              className='form-control'
              name='telephone_number'
              defaultValue={user.telephone_number}
            />
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>SSS</label>
            <input type='text' className='form-control' name='sss' defaultValue={user.sss} />
          </div>
          <div className='form-group col'>
            <label>Philhealth</label>
            <input type='text' className='form-control' name='philhealth' defaultValue={user.philhealth} />
          </div>
          <div className='form-group col'>
            <label>TIN</label>
            <input type='text' className='form-control' name='tin' defaultValue={user.tin} />
          </div>
        </div>
        {this.props.children}
      </form>
    )
  }
}

export default withRouter(Form)
