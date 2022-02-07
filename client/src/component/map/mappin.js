import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import { webToken } from '../../constant/const';

import { PersonPinCircle, Star } from '@material-ui/icons';

import axios from 'axios';
import { format } from 'timeago.js';

import style from './style.module.css';

const MapPin = () => {
  const currentUser = 'Roma';
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get('/pins');
        setPins(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  console.log(currentPlaceId);
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
      {pins.map((pin) => (
        <>
          <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom">
            <PersonPinCircle
              style={{
                fontSize: '38',
                color: pin.username === currentUser ? 'red' : 'blue',
                cursor: 'pointer',
              }}
              onClick={() => handleMarkerClick(pin._id)}
            />
          </Marker>
          {pin._id === currentPlaceId && (
            <Popup
              longitude={pin.long}
              latitude={pin.lat}
              anchor="left"
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className={style.card}>
                <label>Place</label>
                <h4 className={style.place}>{pin.title}</h4>
                <label>Review</label>
                <p className={style.review}>{pin.description}</p>
                <label>Type</label>
                <div className={style.type}>SomeType</div>
                <label>Rating</label>
                <div className={style.rating}>
                  <Star className={style.star} />
                  <Star className={style.star} />
                  <Star className={style.star} />
                  <Star className={style.star} />
                  <Star className={style.star} />
                </div>
                <label>Information</label>
                <span className={style.username}>
                  Created by <b>{pin.username}</b>
                </span>
                <span className={style.date}>{format(pin.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
    </Map>
  );
};

export default MapPin;
