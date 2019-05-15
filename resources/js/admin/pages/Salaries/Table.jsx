import React, { Component } from 'react'
import Datatable from '../../../components/Datatable'

export class Table extends Component {
  render() {
    return (
      <Datatable
        api='role_salaries'
        title='Salaries'
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' },
          { label: 'Daily', key: 'daily' },
          { label: 'Monthly', key: 'monthly' }
        ]}
        excluded={['view', 'add', 'delete']}
      />
    )
  }
}

export default Table
