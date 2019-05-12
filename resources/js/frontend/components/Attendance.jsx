import React, { Component } from 'react'
import $ from 'jquery'
import autobind from 'autobind-decorator'
import FuzzySearch from 'fuzzy-search'
import SimpleBar from 'simplebar-react'

import Api from '../assets/Api'
import Loader from '../components/Loader'

export class Attendance extends Component {
  state = { isLoading: true, data: [], searchedData: [] }

  componentDidMount() {
    $(document).click(function(e) {
      if ($(e.target).closest('.sidebar').length == 0 && $('.sidebar').css('width') != '0px') {
        $('.sidebar').css('width', '0px')
      }
    })
  }

  toggle() {
    if ($('.sidebar').css('width') != '0px') {
      $('.sidebar').css('width', '0px')
    } else {
      $('.sidebar').css('width', '300px')
      this.fetchData()
    }
  }

  @autobind
  handleSearch(e) {
    const text = e.target.value
    this.filter(text)
  }

  filter(text = this.state.searchedText) {
    const searcher = new FuzzySearch(this.state.data, ['name'])
    const searchedData = searcher.search(text)
    this.setState({ searchedData, searchedText: text })
  }

  @autobind
  fetchData() {
    const attendance = new Api('attendances')
    this.setState({ isLoading: true })
    attendance
      .get()
      .then(({ data }) => {
        this.setState({ data })
        this.filter()
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { searchedData, searchedText, data } = this.state

    return (
      <div className='sidebar shadow'>
        <div className='d-flex p-2'>
          <input type='text' className='form-control' onChange={this.handleSearch} />
          <button
            className='btn btn-primary btn-sm btn-rounded p-0'
            onClick={this.fetchData}
            disabled={this.state.isLoading}
          >
            <i className='fas fa-sync' />
          </button>
        </div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <SimpleBar>
            <ul className='list-group'>
              {(searchedText ? searchedData : data).map((item, key) => (
                <li key={key} className='list-group-item'>
                  {item.name}
                  <i class='fas fa-circle' style={{ color: item.logged ? '#42b72a' : '#ccc' }} />
                </li>
              ))}
            </ul>
          </SimpleBar>
        )}
      </div>
    )
  }
}

export default Attendance
