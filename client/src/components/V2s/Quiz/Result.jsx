import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Adoption from '../../Adoption.jsx';

const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 50px;
`;

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
      <Typography
        variant="h3"
        align="center"
        style={{
				  color: '#eee3cb',
				  border: '1px solid black',
				  backgroundColor: '#375E3D',
        }}
      >
        {response()}
      </Typography>
      <Center>
        <Adoption animalData={resultPet} />
      </Center>
    </Container>
  );
}

export default Result;
