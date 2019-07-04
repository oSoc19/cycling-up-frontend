import React, { Component } from "react";
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

import Slider from './Slider';
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

// import Slider from './Slider';

// const  historyMap = () => {
//     const state = {
//         lat: 50.850346,
//         lng: 4.351721,
//         zoom: 13
//     }

//     const position = [state.lat, state.lng]
//     return (
//         <div>
//             <Map center={position} zoom={state.zoom}>
//                 <TileLayer  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <Marker position={position}>
//                     <Popup>
//                         A pretty CSS3 popup. <br /> Easily customizable.
//                     </Popup>
//                 </Marker>
//             </Map>
//             <Slider />
//         </div>
//     );
// };

// export default historyMap;


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Application extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 4.3655,
      lat: 50.8288,
      zoom: 10.5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        {/* <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div> */}
        <div ref={el => this.mapContainer = el} className="map absolute top right left bottom" />
        <div className = "container-slider">
          <Slider />
        </div>
        
      </div>
    );
  }
}

export default Application;
