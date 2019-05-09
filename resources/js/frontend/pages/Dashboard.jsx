import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className='font-weight-bold mt-4 text-center'>Common Tasks</h3>
        <div className='row' style={{ margin: 20 }}>
          <div className=' col-sm-12 col-md-8'>
            <div className='row'>
              <div className='col-sm-12 col-md-6 dashboard-tile '>
                <Link to='/leaves/add'>
                  <div className='card shadow'>
                    <div className='card-body'>Manage Leaves</div>
                  </div>
                </Link>
              </div>
              <div className='col-sm-12 col-md-6 dashboard-tile'>
                <Link to='/attachments'>
                  <div className='card shadow'>
                    <div className='card-body'>Update Forms</div>
                  </div>
                </Link>
              </div>
              <div className='col-sm-12 col-md-6 dashboard-tile'>
                <div className='card shadow'>
                  <div className='card-body'>Generate Government Forms</div>
                </div>
              </div>
              <div className='col-sm-12 col-md-6 dashboard-tile'>
                <div className='card shadow'>
                  <div className='card-body'>Generate Monthly Summary</div>
                </div>
              </div>
            </div>
          </div>
          <div className=' col-sm-12 col-md-4'>
            <div className='card shadow'>
              <div className='card-body'>
                <b>Attendance</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
