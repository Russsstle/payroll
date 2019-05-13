import React, { Component } from 'react'

export class Loader extends Component {
  render() {
    return (
      <div className='ml-2 mt-4'>
        <span className='spinner-border text-primary' />
      </div>
    )
  }
}

export default Loader
