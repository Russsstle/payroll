import React, { Component } from 'react'

export class Loader extends Component {
  render() {
    const { align } = this.props

    return (
      <div className={`mt-4 w-100 text-${align || 'left'} ${align != 'center' && 'mx-2'}`}>
        <span className='spinner-border text-primary' />
      </div>
    )
  }
}

export default Loader
