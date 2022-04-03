import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import Select from 'react-select';

import 'mapbox-gl/dist/mapbox-gl.css';

import { webToken } from '../../constant/const';

import { Close, PersonPinCircle, Star } from '@material-ui/icons';

import axios from 'axios';
import { format } from 'timeago.js';

import style from './style.module.css';
import 'antd/dist/antd.css';

import Register from '../authAndRegister/Register';
import Auth from '../authAndRegister/Auth';

const MapPin = () => {
  const storage = window.localStorage;

  const options = [
    { value: 'Architectural', label: 'Architectural' },
    { value: 'Culinary', label: 'Culinary' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Historical', label: 'Historical' },
    { value: 'Other', label: 'Other' },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  let [selectType, setSelectType] = useState(1);

  // selectedOption === options[1]
  //   ? 2
  //   : selectedOption === options[2]
  //   ? 3
  //   : selectedOption === options[3]
  //   ? 4
  //   : selectedOption === options[4]
  //   ? 5
  //   : 1;

  const [currentUser, setCurrentUser] = useState(storage.getItem('token'));
  const [pins, setPins] = useState([]);
  const [newPlacePin, setNewPlacePin] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDecription] = useState(null);
  const [type, setType] = useState(1);
  const [rating, setRating] = useState(1);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const handleAddPopUpClick = (e) => {
    console.log(e);
    const { lat, lng } = e.lngLat;
    setNewPlacePin({
      lat,
      lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      type,
      rating,
      lat: newPlacePin.lat,
      long: newPlacePin.lng,
    };

    try {
      const response = await axios.post('/pins', newPin);
      setPins([...pins, response.data]);
      setNewPlacePin(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    storage.clear('token');
    setCurrentUser(null);
  };

  console.log(selectedOption);

  const handleChange = (selectedOption) => {
    setSelectedOption({ selectedOption });
    selectType =
      selectedOption === options[0]
        ? setSelectType(1)
        : selectedOption === options[1]
        ? setSelectType(2)
        : selectedOption === options[2]
        ? setSelectType(3)
        : selectedOption === options[3]
        ? setSelectType(4)
        : selectedOption === options[4]
        ? setSelectType(5)
        : null;
  };

  console.log(selectType);

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

  return (
    <div>
      <Map
        initialViewState={{
          longitude: 32,
          latitude: 49,
          zoom: 4,
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={webToken}
        onDblClick={handleAddPopUpClick}
      >
        <div className={`select-price`} style={{ width: '50%' }}>
          <Select
            defaultValue={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </div>

        {pins.map((pin) => (
          <>
            {pin.type === selectType ? (
              <Marker
                longitude={pin.long}
                latitude={pin.lat}
                key={pin.type}
                anchor="bottom"
              >
                <PersonPinCircle
                  style={{
                    fontSize: '38',
                    color:
                      pin.rating === 1 && !currentUser
                        ? '#FF1800'
                        : pin.rating === 2 && !currentUser
                        ? '#FF8700'
                        : pin.rating === 3 && !currentUser
                        ? '#1DD300'
                        : pin.rating === 4 && !currentUser
                        ? '#05819E'
                        : pin.rating === 5 && !currentUser
                        ? '#7F07A9'
                        : pin.username === currentUser
                        ? 'red'
                        : 'blue',
                  }}
                  onClick={() => handleMarkerClick(pin._id)}
                />
              </Marker>
            ) : null}

            {pin._id === currentPlaceId && (
              <Popup
                key={pin._id}
                longitude={pin.long}
                latitude={pin.lat}
                anchor="left"
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className={style.card}>
                  <label>Place</label>
                  <h4 className={style.place}>{pin.title}</h4>
                  <label>Description</label>
                  <p className={style.review}>{pin.description}</p>
                  <label>Type</label>
                  <div className={style.type}>
                    {pin.type === 1
                      ? 'Architectural'
                      : pin.type === 2
                      ? 'Culinary'
                      : pin.type === 3
                      ? 'Sports'
                      : pin.type === 4
                      ? 'Historical'
                      : pin.type === 5
                      ? 'Other'
                      : pin.type}
                  </div>
                  <label>Rating</label>
                  <div className={style.rating}>
                    {Array(pin.rating).fill(<Star className={style.star} />)}
                  </div>
                  <label>Information</label>
                  <span className={style.username}>
                    Created by <b>{pin.username}</b>
                  </span>
                  <span className={style.date}>{format(pin.createdAt)}</span>
                  <Close
                    className={style.closePopUp}
                    onClick={() => setCurrentPlaceId(null)}
                  />
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlacePin && (
          <Popup
            longitude={newPlacePin.lng}
            latitude={newPlacePin.lat}
            anchor="left"
            closeOnClick={false}
            onClose={() => setNewPlacePin(null)}
          >
            <div>
              <form className={style.card} onSubmit={handleSubmit}>
                <label>Place</label>
                <input
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Plese, write you`re description"
                  onChange={(e) => setDecription(e.target.value)}
                />
                <label>Type</label>
                <select onChange={(e) => setType(e.target.value)}>
                  <option value="1">Architectural</option>
                  <option value="2">Culinary</option>
                  <option value="3">Sports</option>
                  <option value="4">Historical</option>
                  <option value="5">Other</option>
                </select>
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className={style.Create__Pin} type="submit">
                  Add Pin
                </button>
                <Close
                  className={style.closePopUp}
                  onClick={() => setNewPlacePin(null)}
                />
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className={style.logout} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div className={style.button__container}>
            <button className={style.login} onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className={style.register}
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Auth
            setShowLogin={setShowLogin}
            storage={storage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Map>
    </div>
  );
};

export default MapPin;
