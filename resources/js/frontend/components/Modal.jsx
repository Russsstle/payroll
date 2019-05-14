import React, { Component } from 'react'

export class Modal extends Component {
  componentWillUnmount() {
    $(this.props.forwardedRef.current).modal('hide')
  }

  render() {
    return (
      <div id={this.props.id} ref={this.props.forwardedRef} className='modal fade' tabIndex='-1'>
        <div
          className='modal-dialog modal-dialog-scrollable'
          style={this.props.width ? { width: this.props.width, maxWidth: '100%' } : {}}
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{this.props.title}</h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default React.forwardRef((props, ref) => <Modal {...props} forwardedRef={ref} />)
