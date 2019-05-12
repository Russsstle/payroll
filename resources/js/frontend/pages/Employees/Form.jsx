import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'

import Api from '../../assets/Api'
import Loader from '../../components/Loader'

import nationalities from '../../strings/nationalities'
import civilstatus from '../../strings/civilstatus'
import messages from '../../strings/messages'

export class Form extends Component {
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

  fetchData() {
    const users = new Api('users')
    users
      .find(this.props.match.params.id)
      .then(({ data }) => {
        this.setState({ isLoading: false, user: data })

        if (this.props.type == 'view') {
          $('input, select').prop('disabled', true)
        }
      })
      .catch(() => {
        alert(messages.FETCH_PROFILE_FAIL)
      })
  }

  fetchRoles() {
    const roles = new Api('roles')
    roles
      .get()
      .then(({ data }) => {
        this.setState({ roles: data })
      })
      .catch(() => {
        alert(messages.FETCH_ROLES_FAIL)
      })
  }

  @autobind
  handleAvatarChange(e) {
    const file = e.target.files[0]

    this.setState({ avatar: { url: URL.createObjectURL(file), name: file.name } })
  }

  render() {
    const { onSubmit, type } = this.props
    const { avatar, roles, user, isLoading } = this.state
    const { profile } = user

    return isLoading ? (
      <Loader />
    ) : (
      <form className='mt-3' onSubmit={onSubmit}>
        <div className='row'>
          <div className='form-group col-4'>
            <div className='file-upload-viewer'>
              <img src={avatar.url} alt='' />
            </div>
            {type != 'view' && (
              <div className='custom-file'>
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
              defaultValue={profile.first_name}
              required
            />
          </div>
          <div className='form-group col'>
            <label>Middle Name</label>
            <input
              type='text'
              className='form-control'
              name='middle_name'
              defaultValue={profile.middle_name}
            />
          </div>
          <div className='form-group col'>
            <label>Last Name</label>
            <input
              type='text'
              className='form-control'
              name='last_name'
              defaultValue={profile.last_name}
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
                defaultChecked={!profile.gender || profile.gender == 'Male'}
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
                defaultChecked={profile.gender == 'Female'}
              >
                Female
              </label>
            </div>
          </div>
          <div className='form-group col'>
            <label>Birthday</label>
            <input type='date' className='form-control' name='birthday' defaultValue={profile.birthday} />
          </div>
          <div className='form-group col'>
            <label>Civil Status</label>
            <select className='custom-select' name='civil_status' defaultValue={profile.civil_status || -1}>
              <option />
              {civilstatus.map((item, key) => (
                <option key={key}>{item}</option>
              ))}
            </select>
          </div>
          <div className='form-group col'>
            <label>Nationality</label>
            <select className='custom-select' name='nationality' defaultValue={profile.nationality || -1}>
              <option />
              {nationalities.map((item, key) => (
                <option key={key}>{item}</option>
              ))}
            </select>
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Address</label>
            <input type='text' className='form-control' name='address' defaultValue={profile.address} />
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Email Address</label>
            <input type='text' className='form-control' name='email' defaultValue={profile.email} />
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Mobile Number</label>
            <input
              type='text'
              className='form-control'
              name='mobile_number'
              defaultValue={profile.mobile_number}
            />
          </div>
          <div className='form-group col'>
            <label>Telephone Number</label>
            <input
              type='text'
              className='form-control'
              name='telephone_number'
              defaultValue={profile.telephone_number}
            />
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>SSS</label>
            <input type='text' className='form-control' name='sss' defaultValue={profile.sss} />
          </div>
          <div className='form-group col'>
            <label>Philhealth</label>
            <input type='text' className='form-control' name='philhealth' defaultValue={profile.philhealth} />
          </div>
          <div className='form-group col'>
            <label>Tin</label>
            <input type='text' className='form-control' name='tin' defaultValue={profile.tin} />
          </div>
        </div>
        {this.props.children}
      </form>
    )
  }
}

export default withRouter(Form)
