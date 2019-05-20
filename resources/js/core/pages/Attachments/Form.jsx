import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'

import Api from '../../../core/assets/Api'
import Loader from '../../../core/components/Loader'

import messages from '../../../core/strings/messages'

export class Form extends Component {
  state = {
    isLoading: this.props.type != 'add',
    attachment: {},
    attachments: [],
    attachmentToDelete: []
  }

  componentDidMount() {
    Waves.attach('.btn')

    if (this.props.type == 'view' || this.props.type == 'edit') {
      this.fetchData()
    }
  }

  @autobind
  deleteAttachment(id) {
    const { attachments } = this.state

    if (attachments[id].id) {
      let attachmentToDelete = attachments[id].id
      this.setState({
        attachmentToDelete: this.state.attachmentToDelete.concat(attachmentToDelete)
      })
    }

    attachments.splice(id, 1)

    this.setState({ attachments })
  }

  @autobind
  handleFile(e) {
    const { files } = e.target

    var { attachments } = this.state

    for (let file of files) {
      attachments = attachments.concat({
        url: URL.createObjectURL(file),
        name: file.name,
        file
      })
    }
    this.setState({ attachments })
  }

  async fetchData() {
    const attachment = new Api('attachments')

    try {
      const { data } = await attachment.find(this.props.match.params.id)
      this.setState({ isLoading: false, attachment: data, attachments: data.files })
      if (this.props.type == 'view') {
        $('form')
          .find('input, select')
          .prop('disabled', true)
      }
    } catch (err) {
      console.log(err)
      alert(messages.FETCH_FAIL)
    }
  }

  render() {
    const { onSubmit, type } = this.props
    const { attachment, attachments, isLoading } = this.state

    return isLoading ? (
      <Loader />
    ) : (
      <form className='mt-3' onSubmit={onSubmit}>
        <div className='row'>
          <div className='w-100' />
          <div className='form-group col'>
            <label>File Name</label>
            <input
              type='text'
              className='form-control'
              name='name'
              defaultValue={attachment.name}
              disabled={type == 'edit'}
              required
            />
          </div>
          <div className='w-100' />
          <div className='form-group col'>
            <label>Type</label>
            <select className='custom-select' name='type' defaultValue={attachment.type} required>
              <option />
              <option>Documents</option>
              <option>Others</option>
            </select>
          </div>
          <div className='w-100' />
          <div className='form-group col-4'>
            <ul className='list-group attachment-list'>
              {attachments.map((item, key) => (
                <li className='list-group-item'>
                  <a href={item.url} target='_blank' className='file'>
                    {item.name}
                  </a>
                  {type != 'view' && (
                    <a className='btn-delete' onClick={() => this.deleteAttachment(key)}>
                      <i className='fas fa-times' />
                    </a>
                  )}
                </li>
              ))}
            </ul>
            {type != 'view' && (
              <div className='custom-file mt-2'>
                <input
                  type='file'
                  className='custom-file-input'
                  id='attachment'
                  onChange={this.handleFile}
                  multiple
                />
                <label className='custom-file-label' htmlFor='attachment'>
                  Add Attachment
                </label>
              </div>
            )}
          </div>
        </div>
        {this.props.children}
      </form>
    )
  }
}

export default withRouter(Form)
