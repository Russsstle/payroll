import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import autobind from 'autobind-decorator'

import auth from '../assets/Auth'

export class Navbar extends Component {
  @autobind
  async logout() {
    if (confirm('Are you sure do you want to logout?')) {
      auth.logout()
      this.props.refreshAuth()
    }
  }

  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light  shadow w-100'>
        <Link className='navbar-brand' to='/'>
          Navbar
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
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
              <Link
                className='nav-link dropdown-toggle'
                to='#'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                More
              </Link>
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
                <Link className='dropdown-item' to='#'>
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
                Stella Polaris IT
              </Link>
              <div className='dropdown-menu dropdown-menu-right shadow' aria-labelledby='navbarDropdown'>
                <Link className='dropdown-item' to='#'>
                  Edit Profile
                </Link>
                <div className='dropdown-divider' />
                <button className='dropdown-item' to='#' onClick={this.logout}>
                  Log Out
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
