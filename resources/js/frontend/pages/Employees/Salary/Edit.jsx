import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Api from '../../../assets/Api'
import Form from './Form'
import messages from '../../../strings/messages'
import Button from '../../../components/Button'
import { parseForm } from '../../../assets/Helper'

export class Edit extends Component {
  id = this.props.match.params.id
  state = { isSubmitting: false }

  @autobind
  async handleSubmit(e) {
    e.preventDefault()

    this.setState({ isSubmitting: true })

    const salary = new Api('salaries')
    try {
      await salary.add(parseForm(e.target))
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
        <h2>Edit Salary</h2>
        <Form type='edit' onSubmit={this.handleSubmit}>
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
