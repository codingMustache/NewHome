import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';

function RoulettePick() {
  const [user, setUser] = useState({});
  const [animals, setAnimals] = useState([]);

  const retriveUserData = () => {
    axios
      .get('/proAuth')
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  };

  const useSaved = () => {
    axios
      .get(`/pet/savePet/${user.id}`)
      .then((data) => setAnimals(data.data.filter((a) => a.adopted === 'adoptable')))
      .catch((err) => console.log(err, 'pet err'));
  };

  useEffect(() => {
    retriveUserData();
  }, []);

  return (
    <div>
      <p>TESTING TESTING</p>
      <button type="button" onClick={useSaved}>
        Use saved animals
      </button>
      <Link
        to="/wheel"
        state={{ wheelArray: animals.map((a) => a.name), animalObjs: animals }}
      >
        <button type="button">Start THE WHEEL</button>
      </Link>
    </div>
  );
}
export default RoulettePick;
