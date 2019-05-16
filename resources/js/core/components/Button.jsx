import React, { Component } from 'react'

export class Button extends Component {
  render() {
    return (
      <button
        className={this.props.className}
        disabled={this.props.loading}
        {..._.pickBy(this.props, (x, y) => y != 'loading')}
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
