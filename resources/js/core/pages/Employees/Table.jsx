import React, { Component } from 'react'
import Datatable from '../../../core/components/Datatable'

export class Table extends Component {
  render() {
    return (
      <Datatable
        api='users'
        title='Employees'
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Avatar', key: 'avatar', image: true, searchable: false, sortable: false },
          { label: 'Name', key: 'name' },
          { label: 'Role', key: 'role_name' },
          { label: 'Date Registered', key: 'created_at' }
        ]}
        excluded={['delete']}
      />
    )
  }
}

export default Table
