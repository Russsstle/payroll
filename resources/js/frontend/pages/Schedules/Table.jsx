import React, { Component } from 'react'
import Datatable from '../../components/Datatable'

export class Table extends Component {
  render() {
    return (
      <Datatable
        api='role_schedules'
        title='Schedules'
        columns={[
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'name' },
          { label: 'Monday', key: 'monday' },
          { label: 'Tuesday', key: 'tuesday' },
          { label: 'Wednesday', key: 'wednesday' },
          { label: 'Thursday', key: 'thursday' },
          { label: 'Friday', key: 'friday' },
          { label: 'Saturday', key: 'saturday' }
        ]}
        excluded={['view', 'add', 'delete']}
      />
    )
  }
}

export default Table
