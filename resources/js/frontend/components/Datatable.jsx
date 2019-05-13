import React, { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BrowserRouter, withRouter, Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Api from '../assets/Api'
import Button from '../components/Button'
import messages from '../strings/messages'

export class Datatable extends Component {
  api = new Api(this.props.api)
  datatable = React.createRef()

  state = {
    isLoading: false,
    data: []
  }

  componentDidMount() {
    this.dtInit()
  }

  dtInit() {
    const { history } = this.props

    this.dTable = $(this.datatable.current).DataTable({
      select: true,
      processing: true,
      serverSide: true,
      searchHighlight: true,
      language: {
        processing: 'Loading...'
      },
      ajax: {
        url: '/api/' + this.props.api + '?type=table',
        headers: {
          Authorization: localStorage.token ? 'Bearer ' + localStorage.token : null
        },
        error: () => {
          alert(messages.SERVER_ERROR)
        }
      },
      columns: [
        ...this.props.columns.map(column => ({
          data: column.key,
          sortable: column.sortable !== false,
          searchable: column.searchable !== false,
          render: data => {
            if (column.image) {
              return `<img src="${data}" alt='' height='80' width='80'>`
            }

            return data
          }
        })),
        {
          sortable: false,
          searchable: false,
          render: (data, type, row) => {
            return renderToStaticMarkup(this.actionsButton(row.id))
          }
        }
      ],
      fnDrawCallback: () => {
        Waves.attach('.btn')
        $(this.datatable.current)
          .find('a')
          .click(function(e) {
            e.preventDefault()
            history.push($(this).attr('href'))
          })
      },
      initComplete: () => {
        const { dTable } = this
        let timeout = null

        $('.dt-bootstrap4')
          .find('input[type=search]')
          .unbind()
        $('.dt-bootstrap4')
          .find('input[type=search]')
          .bind('keyup', function(e) {
            clearTimeout(timeout)

            timeout = setTimeout(() => {
              dTable.search(this.value).draw()
            }, 250)
          })
      }
    })
  }

  @autobind
  actionsButton(id) {
    const { match } = this.props

    return (
      <>
        {this.props.excluded.indexOf('view') == -1 && (
          <a href={`${match.path}/${id}`} className='btn btn-primary btn-rounded btn-sm btn-block'>
            <i className='fas fa-eye' />
            View
          </a>
        )}
        {this.props.excluded.indexOf('edit') == -1 && (
          <a href={`${match.path}/${id}/edit`} className='btn btn-primary btn-rounded btn-sm btn-block'>
            <i className='fas fa-edit' />
            Edit
          </a>
        )}
        {this.props.excluded.indexOf('delete') == -1 && (
          <a href={`${match.path}/${id}/edit`} className='btn btn-primary btn-rounded btn-sm btn-block'>
            <i className='fas fa-trash' />
            Delete
          </a>
        )}
      </>
    )
  }

  @autobind
  fetchData() {
    this.setState({ isLoading: true })

    this.dTable.ajax.reload(() => {
      this.setState({ isLoading: false })
    })
  }

  render() {
    const { columns, match } = this.props

    return (
      <>
        <div className='clearfix mb-2'>
          <h2 className='float-left'>{this.props.title}</h2>
          <div className='float-right'>
            <Button
              className='btn btn-primary btn-rounded btn-icon mr-2'
              onClick={this.fetchData}
              loading={this.state.isLoading}
            >
              <i className='fas fa-sync' />
            </Button>
            {this.props.excluded.indexOf('add') == -1 && (
              <Link to={`${match.path}/add`} className='btn btn-primary btn-rounded'>
                <i className='fas fa-plus' />
                Add
              </Link>
            )}
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='table-responsive'>
              <table ref={this.datatable} className='table table-hover' width='100%'>
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
              </table>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Datatable)
