import React, { Component } from 'react'

export class Button extends Component {
  render() {
    return (
      <button
        className={this.props.className}
        {..._.pickBy(this.props, x => !_.isBoolean(x))}
        disabled={this.props.loading}
      >
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
