import React, { Component } from 'react'
import autobind from 'autobind-decorator'

import Modal from './Modal'
import Loader from './Loader'
import Api from '../assets/Api'

export class ModalLeaves extends Component {
  id = this.props['data-id']
  modal = React.createRef()
  state = { isLoading: true }

  componentDidMount() {
    $(this.modal.current).on('shown.bs.modal', () => {
      this.fetchData()
    })
  }

  @autobind
  async fetchData() {
    this.setState({ isLoading: true })

    const leave = new Api('leaves')

    try {
      const { data } = await leave.find(this.id, { type: 'personal' })
      this.setState({ isLoading: false, data })
    } catch (err) {
      alert(messages.SERVER_ERROR)
      console.log(err)
    }
  }

  render() {
    const { isLoading, data } = this.state

    return (
      <Modal id={this.props.id} ref={this.modal} width='70%' title='My Leaves'>
        <div className='modal-body'>
          {isLoading ? (
            <Loader align='center' />
          ) : (
            <table className='table table-hover table-bordered w-100'>
              <thead>
                <tr>
                  <th className='text-center'>Type</th>
                  <th className='text-center'>From</th>
                  <th className='text-center'>To</th>
                  <th className='text-center' width='30%'>
                    Note
                  </th>
                  <th className='text-center'>Issued</th>
                </tr>
              </thead>
              <tbody>
                {data.length == 0 ? (
                  <tr>
                    <td colSpan='5' className='text-center'>
                      No data to show
                    </td>
                  </tr>
                ) : (
                  data.map((item, key) => (
                    <tr key={key}>
                      <td>{item.type}</td>
                      <td>{item.from}</td>
                      <td>{item.to}</td>
                      <td>{item.note}</td>
                      <td>{item.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </Modal>
    )
  }
}

export default ModalLeaves
