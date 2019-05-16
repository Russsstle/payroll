import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'
import Barcode from 'react-barcode'

import Api from '../../core/assets/Api'
import Loader from '../../core/components/Loader'
import Button from '../../core/components/Button'

import nationalities from '../../core/strings/nationalities'
import civilstatus from '../../core/strings/civilstatus'
import messages from '../../core/strings/messages'
import { parseForm } from '../../core/assets/Helper'
import { user as userInfo, refreshAuth } from '../../core/assets/Auth'

export class Form extends Component {
  form = React.createRef()
  state = {
    isLoading: true,
    isSubmitting: false,
    avatar: {},
    user: { profile: {} }
  }

  componentDidMount() {
    Waves.attach('.btn')

    this.fetchData()
  }

  async fetchData() {
    this.setState({ isLoading: true })

    const user = new Api('users')
    try {
      const { data } = await user.find(userInfo.id)
      this.setState({ isLoading: false, user: data, avatar: { url: data.avatar } })
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

  @autobind
  handleAvatarChange(e) {
    const file = e.target.files[0]

    this.setState({ avatar: { url: URL.createObjectURL(file), name: file.name } })
  }

  @autobind
  async handleSubmit(e) {
    e.preventDefault()

    this.setState({ isSubmitting: true })

    const user = new Api('users')
    try {
      await user.update(userInfo.id, parseForm(e.target))
      refreshAuth()
      alert(messages.SAVED_SUCCESS)
      this.props.history.push('/')
    } catch (err) {
      console.log(err)
      alert(messages.SERVER_ERROR)
    } finally {
      this.setState({ isSubmitting: false })
    }
  }

  render() {
    const { onSubmit, type } = this.props
    const { avatar, roles, user, isLoading } = this.state

    return isLoading ? (
      <Loader />
    ) : (
      <form className='mt-3' onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='form-group col-4'>
            <img
              className='img-thumbnail'
              style={{ height: 200 }}
              src={
                avatar.url ||
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII='
              }
              alt=''
            />
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
            <Barcode value={user.uid} height={50} displayValue={false} />
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
          <div className='form-group'>
            <Button className='btn btn-primary btn-rounded' loading={this.state.isSubmitting}>
              Save
            </Button>
            <button
              type='button'
              className='btn btn-light btn-rounded'
              onClick={() => {
                this.props.history.goBack()
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default withRouter(Form)
