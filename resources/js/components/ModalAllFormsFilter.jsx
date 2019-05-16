import React, { Component } from 'react'
import autobind from 'autobind-decorator'

import Modal from './Modal'
import Axios from '../assets/Axios'

export class ModalAllFormsFilter extends Component {
  modal = React.createRef()
  state = { employees: [] }

  @autobind
  addEmployee(e) {
    if (e.keyCode == 13) {
      const input = $(e.target)
      const employees = this.state.employees
      if (employees.indexOf(input.val()) == -1) {
        employees.push(input.val())
        input.val('')
      } else {
        input.select()
        alert('ID already exists')
      }

      this.setState({ employees })
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
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                name='name'
                placeholder='Choose Employee/s'
                autoComplete='off'
                onKeyDown={this.addEmployee}
                required
              />
            </div>
            <form target='_blank' action='/generate/bir' method='POST' className='mt-3'>
              <input type='hidden' name='_token' defaultValue={$('meta[name=csrf-token]').attr('content')} />
              {this.state.employees.map((item, key) => (
                <input key={key} type='hidden' name='employee[]' value={item} />
              ))}

              <div className='form-group'>
                <button className='btn btn-primary'>Generate</button>
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
