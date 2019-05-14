import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import FuzzySearch from 'fuzzy-search'
import SimpleBar from 'simplebar-react'

import Api from '../assets/Api'
import Loader from '../components/Loader'
import Button from '../components/Button'

export class Attendance extends Component {
  state = { isLoading: true, data: [], searchedData: [] }

  componentDidMount() {
    $(document).on('mousedown.hideAttendance', function(e) {
      if (
        e.which == 1 &&
        $(e.target).closest('.sidebar').length == 0 &&
        !$(e.target).hasClass('fas') &&
        $('.sidebar').css('width') != '0px'
      ) {
        $('.sidebar').css('width', '0px')
      }
    })
  }

  componentWillUnmount() {
    $(document).unbind('click.hideAttendance')
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
  async fetchData() {
    const attendance = new Api('attendances')
    this.setState({ isLoading: true })

    try {
      const { data } = await attendance.get()
      this.setState({ data: _.sortBy(data, ['name']) })
      this.filter()
    } catch (err) {
      console.log(err)
      alert(messages.SERVER_ERROR)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { searchedData, searchedText, data } = this.state

    return (
      <div className='sidebar shadow'>
        <div className='d-flex p-2'>
          <input type='text' className='form-control' onChange={this.handleSearch} />
          <Button
            className='btn btn-primary btn-sm btn-rounded btn-icon p-0'
            onClick={this.fetchData}
            loading={this.state.isLoading}
          >
            <i className='fas fa-sync' />
          </Button>
        </div>
        {this.state.isLoading ? (
          <Loader align='center' />
        ) : (
          <SimpleBar>
            <ul className='list-group'>
              {(searchedText ? searchedData : data).map((item, key) => (
                <li key={key} className='list-group-item'>
                  {item.name}
                  <i className='fas fa-circle' style={{ color: item.logged ? '#42b72a' : '#ccc' }} />
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
