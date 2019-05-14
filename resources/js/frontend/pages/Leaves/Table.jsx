import React, { Component } from 'react'
import Datatable from '../../components/Datatable'

export class Table extends Component {
  render() {
    return (
      <Datatable
        api='leaves'
        title='Leaves'
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Type', key: 'type' },
          { label: 'Employee', key: 'name' },
          { label: 'From', key: 'from' },
          { label: 'To', key: 'to' },
          { label: 'Issued', key: 'created_at' }
        ]}
        excluded={['']}
      />
    )
  }
}

export default Table
