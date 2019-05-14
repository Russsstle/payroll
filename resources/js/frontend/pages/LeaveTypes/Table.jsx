import React, { Component } from 'react'
import Datatable from '../../components/Datatable'

export class Table extends Component {
  render() {
    return (
      <Datatable
        api='leave_types'
        title='Leave Types'
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' },
          { label: 'Paid', key: 'paid' },
          { label: 'Date Registered', key: 'created_at' }
        ]}
      />
    )
  }
}

export default Table
