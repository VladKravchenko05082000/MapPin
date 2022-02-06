import React from 'react';
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import { webToken } from '../../constant/const';

import { PersonPinCircle } from '@material-ui/icons';

const MapPin = () => {
  return (
    <Map
      initialViewState={{
        longitude: 32,
        latitude: 49,
        zoom: 4,
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={webToken}
    >
      <Marker longitude={32} latitude={49} anchor="bottom">
        <PersonPinCircle style={{ fontSize: '38' }} />
      </Marker>
    </Map>
  );
};

export default MapPin;
