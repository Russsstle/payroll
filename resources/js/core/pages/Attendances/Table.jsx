import React, { Component } from 'react'
import Datatable from '../../../core/components/Datatable'

import { user } from '../../../core/assets/Auth'

export class Table extends Component {
  render() {
    return (
      <Datatable
        api='attendances'
        title='Attendances'
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' },
          { label: 'Status', key: 'status' }
        ]}
        excluded={['add', 'edit', 'delete']}
      />
    )
  }
}

export default Table
