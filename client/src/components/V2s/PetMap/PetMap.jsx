import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from 'react-map-gl';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function PetMap() {
  const location = useLocation();
  const zipCode = location.state;
  const [lng, setLng] = useState(-90.0715);
  const [lat, setLat] = useState(29.9511);

  const getGeo = () => {
    axios
      .get(`/geocode${zipCode}`)
      .then((data) => {
        setLng(data.data[0].geometry.location.lng);
        setLat(data.data[0].geometry.location.lat);
      })
      .catch((err) => console.log(err));
  };

  useEffect(getGeo, []);

  return (
    <div
      style={{
			  display: 'flex',
			  justifyContent: 'center',
			  backgroundColor: '#E3C770',
			  border: 'thin solid black',
			  borderRadius: '50px',
			  padding: '20px',
      }}
    >
      <Map
        mapboxAccessToken="pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg"
        style={{
				  width: window.innerWidth - 20,
				  height: window.innerHeight - 20,
				  borderRadius: '50px',
        }}
        initialViewState={{
				  longitude: lng,
				  latitude: lat,
				  zoom: 3,
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        <Marker longitude={lng} latitude={lat} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />
        <GeolocateControl />
      </Map>
    </div>
  );
}

export default PetMap;
