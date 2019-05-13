import React, { Component } from 'react'

export class Button extends Component {
  render() {
    return (
      <button className={this.props.className} disabled={this.props.loading} onClick={this.props.onClick}>
        {this.props.loading ? (
          <span className='spinner-border spinner-border-sm' aria-hidden='true' />
        ) : (
          this.props.children
        )}
      </button>
    )
  }
}

export default Button
