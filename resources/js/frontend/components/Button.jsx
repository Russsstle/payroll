import React, { Component } from 'react'

export class Button extends Component {
  render() {
    return (
      <button disabled={this.props.status == 'loading'} {...this.props}>
        {this.props.status == 'loading' ? <i className='fa fa-spinner fa-spin fa-lg' /> : this.props.children}
      </button>
    )
  }
}

export default Button
