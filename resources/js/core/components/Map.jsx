import React, { Component } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'

const GMap = withScriptjs(
  withGoogleMap(props => {
    const { marker } = props

    return (
      <GoogleMap defaultZoom={18} defaultCenter={marker}>
        <Marker position={marker} />
      </GoogleMap>
    )
  })
)

export class Map extends Component {
  render() {
    return (
      <GMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyABxtKogXuWlEjb5yLzvikqIleo8cDBacE&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        {...this.props}
      />
    )
  }
}

export default Map
