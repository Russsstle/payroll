import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

import Attendance from '../../components/Attendance'
import ModalAllForms from '../../components/ModalAllForms'
import ModalAllSalaries from '../../components/ModalAllSalaries'
import ModalAllFormsFilter from '../../components/ModalAllFormsFilter'

class Dashboard extends Component {
  attendance = React.createRef()

  @autobind
  toggleAttendance() {
    this.attendance.current.toggle()
  }

  render() {
    return (
      <>
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
            <a data-toggle='modal' data-target='#modalAllForms'>
              <div className='card shadow'>
                <div className='card-body'>Generate Government Forms</div>
              </div>
            </a>
          </div>
          <div className='col-sm-12 col-md-4 dashboard-tile'>
            <a data-toggle='modal' data-target='#modalAllSalaries'>
              <div className='card shadow'>
                <div className='card-body'>Generate Monthly Summary</div>
              </div>
            </a>
          </div>
        </div>
        <ModalAllForms id='modalAllForms' />
        <ModalAllSalaries id='modalAllSalaries' />
        <ModalAllFormsFilter id='modalAllFormsFilter' />
        <Attendance ref={this.attendance} />
      </>
    )
  }
}

export default Dashboard
