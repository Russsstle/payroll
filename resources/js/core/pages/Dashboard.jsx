import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

import { user } from '../../core/assets/Auth'
import Attendance from '../../core/components/Attendance'
import ModalAllForms from '../../core/components/ModalAllForms'
import ModalAllSalaries from '../../core/components/ModalAllSalaries'
import ModalAllFormsFilter from '../../core/components/ModalAllFormsFilter'
import ModalAllFormsFilterV2 from '../../core/components/ModalAllFormsFilterV2'

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
          {user.type == 'Admin' ? (
            <>
              <div className='col-sm-12 col-md-4 dashboard-tile '>
                <Link to='/leaves'>
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
              <ModalAllForms id='modalAllForms' />
              <ModalAllSalaries id='modalAllSalaries' />
              <ModalAllFormsFilter id='modalAllFormsFilter-bir' name='bir' />
              <ModalAllFormsFilterV2 id='modalAllFormsFilterV2-bir' name='bir' />
              <ModalAllFormsFilterV2 id='modalAllFormsFilterV2-erf' name='erf' />
              <ModalAllFormsFilterV2 id='modalAllFormsFilterV2-mrf' name='mrf' />
              <Attendance ref={this.attendance} />
            </>
          ) : (
            <>
              <div className='col-sm-12 col-md-4 dashboard-tile '>
                <Link to='/leaves/add'>
                  <div className='card shadow'>
                    <div className='card-body'>Manage Leaves</div>
                  </div>
                </Link>
              </div>
              <div className='col-sm-12 col-md-4 dashboard-tile '>
                <Link to='/attachments/add'>
                  <div className='card shadow'>
                    <div className='card-body'>Manage Files</div>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </>
    )
  }
}

export default Dashboard
