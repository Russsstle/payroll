import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import $ from 'jquery'
import autobind from 'autobind-decorator'

import Api from '../assets/Api'
import Loader from '../components/Loader'
import Button from '../components/Button'

export class Datatable extends Component {
  api = new Api(this.props.api)

  state = {
    isLoading: true,
    data: []
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    this.api.cancel()
  }

  dtInit() {
    if (this.dTable) this.dTable.destroy()
    this.dTable = $(this.refs.datatable).DataTable({
      processing: true,
      bDestroy: true,
      initComplete: () => {
        Waves.attach('.btn')
      }
    })
  }

  @autobind
  fetchData() {
    this.setState({ isLoading: true })
    this.api
      .get({ type: 'table' })
      .then(({ data }) => {
        this.setState({ data })
      })
      .catch(() => {
        alert('Server error. Please try again.')
      })
      .finally(() => {
        this.setState({ isLoading: false }, () => {
          this.dtInit()
        })
      })
  }

  render() {
    const { columns, match } = this.props

    return (
      <div>
        <div className='clearfix mb-2'>
          <h2 className='float-left'>{this.props.title}</h2>
          <div className='float-right'>
            <Button
              className='btn btn-primary btn-rounded mr-2'
              onClick={this.fetchData}
              loading={this.state.isLoading}
            >
              Refresh
            </Button>
            {this.props.excluded.indexOf('add') == -1 && (
              <Link to={`${match.path}/add`} className='btn btn-primary btn-rounded'>
                Add
              </Link>
            )}
          </div>
        </div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive'>
                <table ref='datatable' className='table table-hover' width='100%'>
                  <thead>
                    <tr>
                      {columns.map((item, key) => (
                        <th key={key} style={item.width ? { width: item.width } : {}}>
                          {item.label}
                        </th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!this.state.isLoading &&
                      this.state.data.map((items, x) => (
                        <tr key={x}>
                          {columns.map((column, y) => (
                            <td key={y}>
                              {column.image ? (
                                <img src={items[column.key]} alt='' height='80' />
                              ) : (
                                items[column.key] || ''
                              )}
                            </td>
                          ))}
                          <td style={{ width: '13%' }}>
                            {this.props.excluded.indexOf('view') == -1 && (
                              <Link
                                to={`${match.path}/${items.id}`}
                                className='btn btn-primary btn-rounded btn-sm btn-block'
                              >
                                <i className='fas fa-eye' />
                                View
                              </Link>
                            )}
                            {this.props.excluded.indexOf('edit') == -1 && (
                              <Link
                                to={`${match.path}/${items.id}/edit`}
                                className='btn btn-primary btn-rounded btn-sm btn-block'
                              >
                                <i className='fas fa-edit' />
                                Edit
                              </Link>
                            )}
                            {this.props.excluded.indexOf('delete') == -1 && (
                              <Link
                                to={`${match.path}/${items.id}/edit`}
                                className='btn btn-primary btn-rounded btn-sm btn-block'
                              >
                                <i className='fas fa-trash' />
                                Delete
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Datatable)
