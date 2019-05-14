import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Api from '../../assets/Api'
import Form from './Form'
import messages from '../../strings/messages'
import Button from '../../components/Button'
import { parseForm } from '../../assets/Helper'

export class Add extends Component {
  form = React.createRef()
  state = { attachments: [] }

  @autobind
  async handleSubmit(e) {
    e.preventDefault()

    this.setState({ isSubmitting: true })

    var data = new FormData()

    for (const item of e.target) {
      if ((item.tagName == 'INPUT' || item.tagName == 'SELECT') && item.type != 'file') {
        data.append(item.name, item.value)
      }
    }

    for (let item of this.form.current.state.attachments) {
      data.append('file[]', item.file)
    }

    const attachment = new Api('attachments')

    try {
      await attachment.add(data)
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
        <h2>Add Attachment</h2>
        <Form wrappedComponentRef={this.form} type='add' onSubmit={this.handleSubmit}>
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

export default withRouter(Add)
