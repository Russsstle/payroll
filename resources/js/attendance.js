import './bootstrap'
import '../sass/attendance.scss'
import 'mdbootstrap/js/mdb'

import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Root from './attendance/Root'

render(
  <AppContainer>
    <BrowserRouter basename='/payroll'>
      <Root />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('app')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept()
}
