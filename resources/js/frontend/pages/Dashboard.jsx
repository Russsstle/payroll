import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Attendance from '../components/Attendance'

class Dashboard extends Component {
  @autobind
  toggleAttendance() {
    this.refs.attendance.toggle()
  }

  render() {
    return (
      <div>
        <h3 className='font-weight-bold mt-4 text-center'>Common Tasks</h3>
        <div className='row' style={{ margin: 20 }}>
          <div className='col-sm-12 col-md-4 dashboard-tile '>
            <Link to='/leaves/add'>
              <div className='card shadow'>
                <div className='card-body'>Manage Leaves</div>
              </div>
            </Link>
          </div>
          <div className='col-sm-12 col-md-4 dashboard-tile'>
            <Link to='/attachments'>
              <div className='card shadow'>
                <div className='card-body'>Update Forms</div>
              </div>
            </Link>
          </div>
          <div className='col-sm-12 col-md-4 dashboard-tile'>
            <div className='card shadow' onClick={this.toggleAttendance}>
              <div className='card-body'>Attendance List</div>
            </div>
          </div>
          <div className='col-sm-12 col-md-4 dashboard-tile'>
            <div className='card shadow'>
              <div className='card-body'>Generate Government Forms</div>
            </div>
          </div>
          <div className='col-sm-12 col-md-4 dashboard-tile'>
            <div className='card shadow'>
              <div className='card-body'>Generate Monthly Summary</div>
            </div>
          </div>
        </div>
        <Attendance ref='attendance' />
      </div>
    )
  }
}

export default Dashboard
