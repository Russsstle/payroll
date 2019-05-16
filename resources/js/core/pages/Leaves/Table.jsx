import React, { Component } from 'react'
import Datatable from '../../../core/components/Datatable'

import { user } from '../../../core/assets/Auth'

export class Table extends Component {
  render() {
    return (
      <Datatable
        api='leaves'
        title='Leaves'
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Employee Name', key: 'name' },
          { label: 'Note', key: 'note' },
          { label: 'From', key: 'from' },
          { label: 'To', key: 'to' },
          { label: 'Issued', key: 'created_at' }
        ].filter(x => (user.type == 'User' ? x.key != 'name' : true))}
      />
    )
  }
}

export default Table
