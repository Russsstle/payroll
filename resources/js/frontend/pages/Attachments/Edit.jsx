import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Api from '../../assets/Api'
import Form from './Form'
import messages from '../../strings/messages'
import Button from '../../components/Button'

export class Edit extends Component {
  id = this.props.match.params.id
  form = React.createRef()
  state = { isSubmitting: false }

  @autobind
  async handleSubmit(e) {
    e.preventDefault()

    this.setState({ isSubmitting: true })

    var data = new FormData()

    for (const item of e.target) {
      if ((item.tagName == 'INPUT' || item.tagName == 'SELECT') && !item.disabled) {
        data[item.name] = item.value
      }
    }

    for (let item of this.form.current.state.attachments) {
      if (!item.id) {
        data.append('file[]', item.file)
      }
    }

    for (let item of this.form.current.state.attachmentToDelete) {
      data.append('attachmentsToDelete[]', item)
    }

    const attachment = new Api('attachments')

    try {
      await attachment.update(this.id, data)
      alert(messages.SAVED_SUCCESS)
      this.props.history.push(this.props.base)
    } catch (err) {
      alert(messages.SERVER_ERROR)
      console.log(err)
    } finally {
      this.setState({ isSubmitting: false })
    }
  }

  render() {
    return (
      <div>
        <h2>Edit Attachment</h2>
        <Form wrappedComponentRef={this.form} type='edit' onSubmit={this.handleSubmit}>
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
        </Form>
      </div>
    )
  }
}

export default withRouter(Edit)
