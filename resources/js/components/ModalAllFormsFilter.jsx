import React, { Component } from 'react'
import autobind from 'autobind-decorator'

import Modal from './Modal'

export class ModalAllFormsFilter extends Component {
  modal = React.createRef()
  state = { employees: [] }

  @autobind
  addEmployee(e) {
    e.preventDefault()
    const input = $(e.target[0])

    const employees = this.state.employees.concat(input.val())
    input.val('')
    this.setState({ employees })
  }
  @autobind
  async generate(e) {
    e.preventDefault()
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

  deleteEmployee(id) {
    const { employees } = this.state

    employees.splice(id, 1)

    this.setState({ employees })
  }

  render() {
    return (
      <Modal id={this.props.id} ref={this.modal} title='Select Range'>
        <div className='modal-body'>
          <div className='container'>
            <form className='mt-3' onSubmit={this.addEmployee}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  placeholder='Choose Employee/s'
                  required
                />
              </div>
              <div className='form-group'>
                <button onClick={this.generate} type='button' class='btn btn-primary'>
                  Generate
                </button>
              </div>
            </form>
            <ul className='list-group'>
              {this.state.employees.map((employee, key) => (
                <li key={key} className='list-group-item'>
                  {employee}
                  <a className='btn-delete float-right' onClick={() => this.deleteEmployee(key)}>
                    <i className='fas fa-times' />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ModalAllFormsFilter
