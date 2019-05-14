import React, { Component } from 'react'

import Modal from './Modal'

export class ModalAllForms extends Component {
  modal = React.createRef()

  componentDidMount() {
    $(this.modal.current).on('shown.bs.modal', function() {
      $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
      })
    })
  }

  render() {
    return (
      <Modal id={this.props.id} ref={this.modal} title='Government Form'>
        <div className='modal-body'>
          <div className='container'>
            <div className='grid'>
              <div className='grid-sizer col-md-3' />
              <div className='grid-item col-md-6 mb-4'>
                <div className='card' style={{ backgroundColor: '#00d1b2' }}>
                  <div className='card-body'>
                    <h5 className='card-title'>PhilHealth</h5>
                    <a href='/generate/pdf/employerRF1' className='card-link'>
                      Employee Remittance Form
                    </a>
                  </div>
                </div>
              </div>
              <div className='grid-item col-md-6 mb-4'>
                <div className='card' style={{ backgroundColor: '#209cee' }}>
                  <div className='card-body'>
                    <h5 className='card-title'>BIR</h5>
                    <a href='/generate/pdf/bir' className='card-link'>
                      BIR Form 2316
                    </a>
                  </div>
                </div>
              </div>
              <div className='grid-item col-md-6 mb-4'>
                <div className='card' style={{ backgroundColor: '#4a4a4a' }}>
                  <div className='card-body'>
                    <h5 className='card-title'>SSS</h5>
                    <div style={{ fontSize: 12 }}>
                      <a href='/generate/pdf/sssMLPR' className='card-link '>
                        Member Loan Payment Return
                      </a>
                      <hr style={{ borderColor: 'white' }} />
                      <a href='/generate/pdf/sssCCL' className='card-link'>
                        Contribution Collection List
                      </a>
                      <hr style={{ borderColor: 'white' }} />
                      <a href='/generate/pdf/sssER' className='card-link'>
                        Employment Report
                      </a>
                      <hr style={{ borderColor: 'white' }} />
                      <a href='/generate/pdf/sssCP' className='card-link'>
                        Contribution Payment
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid-item col-md-6 mb-4'>
                <div className='card' style={{ backgroundColor: '#ff3860' }}>
                  <div className='card-body'>
                    <h5 className='card-title'>Pagibig</h5>
                    <a href='/generate/pdf/membership_remittance' className='card-link'>
                      Membership Remittance Form
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ModalAllForms
