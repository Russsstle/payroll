import React, { Component } from 'react'
import $ from 'jquery'
import autobind from 'autobind-decorator'

import Api from '../assets/Api'
import Loader from '../components/Loader'

export class Datatable extends Component {
  state = {
    isLoading: true,
    data: []
  }

  componentDidMount() {
    this.fetchData()
  }

  dtInit() {
    if (this.dTable) this.dTable.destroy()
    this.dTable = $(this.refs.datatable).DataTable({ processing: true, bDestroy: true })
  }

  @autobind
  async fetchData() {
    this.setState({ isLoading: true })

    const api = new Api('users')
    const { data } = await api.get({ type: 'table' })

    this.setState(
      {
        isLoading: false,
        data
      },
      () => this.dtInit()
    )
  }

  render() {
    const { columns = [] } = this.props

    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className='card'>
        <div className='card-body'>
          <div class='pull-right mb-2'>
            <button type='button' class='btn btn-secondary mr-2' onClick={this.fetchData}>
              Refresh
            </button>
            <button type='button' class='btn btn-secondary'>
              Add
            </button>
          </div>
          <div class='table-responsive'>
            <table ref='datatable' class='table table-hover' width='100%'>
              <thead>
                <tr>
                  {columns.map((item, key) => (
                    <th style={item.width ? { width: item.width } : {}}>{item.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!this.state.isLoading &&
                  this.state.data.map((items, x) => (
                    <tr key={x}>
                      {columns.map((column, y) => (
                        <td key={y}>{items[column.key] || ''}</td>
                      ))}
                      <td>
                        <button className='btn btn-secondary btn-sm btn-block'>View</button>
                        <button className='btn btn-secondary btn-sm btn-block'>Edit</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Datatable
