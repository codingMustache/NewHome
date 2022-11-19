import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Adoption from '../../Adoption.jsx';

function Result({ result }) {
  const [resultPet, setResultPet] = useState({});

  const response = () => {
    if (result === 'noPets') {
      return 'No Pets For You!';
    }
    return `You should get a ${result}!`;
  };

  useEffect(() => {
    axios
      .get(`/pet/result/${result}`)
      .then((pet) => {
        const randomIndex = Math.floor(Math.random() * pet.data.length);
        setResultPet(pet.data[randomIndex]);
      })
      .catch((err) => console.log('Result Pet Request Failed', err));
  }, []);
  return (
    <Container>
      <br />
      <Typography variant="h3" align="center">
        {response()}
      </Typography>
      <Adoption animalData={resultPet} />
    </Container>
  );
}

export default Result;
