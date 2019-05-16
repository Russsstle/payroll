import React, { Component } from 'react'
import Datatable from '../../../core/components/Datatable'

export class Table extends Component {
  render() {
    return (
      <Datatable
        api='attachments'
        title='Attachments'
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' },
          { label: 'Document', key: 'document' },
          { label: 'Type', key: 'type' },
          { label: 'Count', key: 'count' }
        ]}
      />
    )
  }
}

export default Table
