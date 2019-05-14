import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import Modal from './Modal'
import Loader from './Loader'
import Api from '../assets/Api'
import messages from '../strings/messages'

export class ModalAllSalaries extends Component {
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

    const salary = new Api('salaries')

    try {
      const { data } = await salary.get({ filter: $('#monthFilter').val() })
      this.setState({ isLoading: false, data })
    } catch (err) {
      alert(messages.SERVER_ERROR)
      console.log(err)
    }
  }

  render() {
    const { isLoading, data } = this.state
    return (
      <Modal
        id={this.props.id}
        ref={this.modal}
        width='70%'
        title={
          <div className='row ml-2'>
            <select
              className='custom-select col'
              id='yearFilter'
              onChange={this.fetchData}
              defaultValue={moment().format('YYYY')}
              disabled={isLoading}
            >
              {_.range(
                2019,
                +moment()
                  .add(1, 'years')
                  .format('YYYY')
              ).map(x => (
                <option>{x}</option>
              ))}
            </select>
            <select
              className='custom-select col ml-2'
              id='monthFilter'
              onChange={this.fetchData}
              defaultValue='January'
              disabled={isLoading}
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
        }
      >
        <div className='modal-body'>
          {isLoading ? (
            <Loader align='center' />
          ) : (
            <table className='table table-hover table-bordered w-100'>
              <thead>
                <tr>
                  <th className='text-center'>Name</th>
                  <th className='text-center'>SSS</th>
                  <th className='text-center'>Pagibig</th>
                  <th className='text-center'>Philhealth</th>
                  <th className='text-center'>Gross Total</th>
                  <th className='text-center'>Net Total</th>
                </tr>
              </thead>
              <tbody>
                {data.length == 0 ? (
                  <tr>
                    <td colSpan='6' className='text-center'>
                      No data to show
                    </td>
                  </tr>
                ) : (
                  data.map((item, key) => (
                    <tr key={key}>
                      <td>{item.name}</td>
                      <td className='text-center'>
                        <NumberFormat
                          value={item.sss}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </td>
                      <td className='text-center'>
                        <NumberFormat
                          value={item.pagibig}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </td>
                      <td className='text-center'>
                        <NumberFormat
                          value={item.philhealth}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </td>
                      <td className='text-center'>
                        <NumberFormat
                          value={item.gross_total}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </td>
                      <td className='text-center'>
                        <NumberFormat
                          value={item.net_total}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </td>
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

export default ModalAllSalaries
