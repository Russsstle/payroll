import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

import { logout, userInfo, refreshAuth } from '../assets/Auth'

export class Navbar extends Component {
  componentDidMount() {
    Waves.attach('.nav-link')
    Waves.attach('.navbar-brand')
    Waves.attach('.dropdown-item')
  }

  @autobind
  async logout(e) {
    e.preventDefault()

    if (confirm('Are you sure do you want to logout?')) {
      logout()
      refreshAuth()
    }
  }

  render() {
    const { user } = userInfo

    return (
      <nav className='navbar navbar-expand-lg navbar-dark primary-color'>
        <Link className='navbar-brand' to='/'>
          <img src='/images/placeholder-logo.png' alt='' height='28' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarCollapse'
          aria-controls='navbarCollapse'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Dashboard
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/employees'>
                Employees
              </Link>
            </li>

            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                id='navbarDropdown'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                More
              </a>
              <div className='dropdown-menu shadow' aria-labelledby='navbarDropdown'>
                <Link className='dropdown-item' to='/schedules'>
                  Schedules
                </Link>
                <Link className='dropdown-item' to='/salaries'>
                  Salaries
                </Link>
                <Link className='dropdown-item' to='/attachments'>
                  Attachment
                </Link>
                <div className='dropdown-divider' />
                <Link className='dropdown-item' to='/leaves'>
                  Leaves
                </Link>
              </div>
            </li>
            <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle'
                to='#'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Settings
              </Link>
              <div className='dropdown-menu shadow' aria-labelledby='navbarDropdown'>
                <Link className='dropdown-item' to='/leave_types'>
                  Leave Types
                </Link>
              </div>
            </li>
          </ul>
          <ul className='navbar-nav in-line'>
            <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle'
                to='#'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <img className='avatar-icon' src={user.avatar} alt='avatar' />
                {user.name}
              </Link>
              <div className='dropdown-menu dropdown-menu-right shadow' aria-labelledby='navbarDropdown'>
                <Link className='dropdown-item' to='#'>
                  Edit Profile
                </Link>
                <div className='dropdown-divider' />
                <a href='/logout' className='dropdown-item' onClick={this.logout}>
                  Log Out
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
