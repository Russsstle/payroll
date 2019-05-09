import React, { Component } from 'react'
import $ from 'jquery'
import Datatable from '../../components/Datatable'

export class Table extends Component {
  render() {
    return (
      <Datatable
        name='users'
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Avatar', key: 'avatar' },
          { label: 'Name', key: 'name' },
          { label: 'Role', key: 'role_name' },
          { label: 'Date Registered', key: 'created_at' }
        ]}
      />
    )
  }
}

export default Table
