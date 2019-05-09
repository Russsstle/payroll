import './bootstrap'
import '../sass/app.scss'
import 'simplebar'
import 'datatables.net'
import 'datatables.net-bs4'

import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Root from './frontend/Root'

render(
  <AppContainer>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('app')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept()
}
