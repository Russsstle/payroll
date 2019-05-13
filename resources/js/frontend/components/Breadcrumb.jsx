import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Breadcrumb extends Component {
  render() {
    const url =
      this.props.url &&
      this.props.url
        .substr(1)
        .split('/')
        .filter(x => x)

    return (
      url && (
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className={`breadcrumb-item ${url.length == 0 ? 'active' : ''}`}>
              <Link to='/'>Dashboard</Link>
            </li>
            {url.map((item, key) => (
              <li key={key} className={`breadcrumb-item ${key === url.length - 1 ? 'active' : ''}`}>
                {key === url.length - 1 ? (
                  item.replace(/_/g, ' ').replace(/(^| )(\w)/g, function(x) {
                    return x.toUpperCase()
                  })
                ) : (
                  <Link to={'/' + url.slice(0, key + 1).join('/')}>
                    {item.replace(/_/g, ' ').replace(/(^| )(\w)/g, function(x) {
                      return x.toUpperCase()
                    })}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )
    )
  }
}
export default Breadcrumb
