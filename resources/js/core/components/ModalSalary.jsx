import React, { Component, Fragment } from 'react'
import NumberFormat from 'react-number-format'
import autobind from 'autobind-decorator'

import Loader from './Loader'
import Modal from './Modal'
import Api from '../assets/Api'

export class ModalSalary extends Component {
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
      const { data } = await salary.find(this.id, { type: 'payslip', filter: $('#salaryFilter').val() })
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
        title={
          <select
            className='custom-select'
            id='salaryFilter'
            onChange={this.fetchData}
            defaultValue='month'
            disabled={isLoading}
          >
            <option value='month'>This Month</option>
            <option value='year'>This Year</option>
            <option value='all'>All</option>
          </select>
        }
      >
        <div className='modal-body'>
          {isLoading ? (
            <Loader align='center' />
          ) : data.length == 0 ? (
            <table className='table table-hover table-bordered w-100'>
              <thead>
                <tr>
                  <th className='text-center'>Date</th>
                  <th className='text-center'>Computed Hours</th>
                  <th className='text-center'>Salary (₱)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan='3' className='text-center'>
                    No data to show
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            data.map((month, key) => (
              <Fragment key={key}>
                <h4 style={{ marginBottom: 5 }}>{month.dateyear}</h4>
                <table className='table table-hover table-bordered w-100'>
                  <thead>
                    <tr>
                      <th className='text-center'>Date</th>
                      <th className='text-center'>Computed Hours</th>
                      <th className='text-center'>Salary (₱)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {month.data.map((item, key) => (
                      <tr key={key}>
                        <td>{item.date}</td>
                        <td className='text-right'>{item.minutes / 60}</td>
                        <td className='text-right'>
                          <NumberFormat
                            value={item.salary}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan='2' className='text-right'>
                        SSS
                      </td>
                      <td className='text-right'>
                        <NumberFormat
                          value={month.sss}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='2' className='text-right'>
                        Pagibig
                      </td>
                      <td className='text-right'>
                        <NumberFormat
                          value={month.pagibig}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='2' className='text-right'>
                        Philhealth
                      </td>
                      <td className='text-right'>
                        <NumberFormat
                          value={month.philhealth}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan='2' className='text-right'>
                        Gross Total:
                      </th>
                      <th className='text-right'>
                        <NumberFormat
                          value={month.total}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th colSpan='2' className='text-right'>
                        Net Total:
                      </th>
                      <th className='text-right'>
                        <NumberFormat
                          value={month.total - month.sss - month.pagibig - month.philhealth}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </Fragment>
            ))
          )}
        </div>
      </Modal>
    )
  }
}

export default ModalSalary
