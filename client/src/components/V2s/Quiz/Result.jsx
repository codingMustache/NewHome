import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import { maxWidth } from '@mui/system';
import Adoption from '../../Adoption.jsx';

const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 50px;
`;

const Contain = styled(Container)`
	background-color: #eee3cb;
	padding: 5%;
	height: 30%;
	border-radius: 1%;
	border: 1px solid black;
	margin: auto;
	width: 50%;
`;

function Result({ result }) {
  const [resultPet, setResultPet] = useState({});

  const response = () => {
    if (result === 'noPets') {
      return (
        <div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
						  padding: '20px',
            }}
          >
            <img
              src="https://media.tenor.com/PvCN10f8J6oAAAAC/police-car-siren.gif"
              alt="flashinglight"
              style={{ maxWidth: '100px', padding: '50px' }}
            />
            <Typography
              variant="h3"
              align="center"
              style={{
							  color: '#eee3cb',
							  border: '1px solid black',
							  backgroundColor: 'red',
              }}
            >
              {' '}
              No Pets For You!
              {' '}
            </Typography>
            <img
              src="https://media.tenor.com/PvCN10f8J6oAAAAC/police-car-siren.gif"
              alt="flashinglight"
              style={{ maxWidth: '100px', padding: '50px' }}
            />
          </Box>

          {/* <Contain> */}
          <Center>
            <Card sx={{ width: '750px', border: '8px solid #A64B2A' }}>
              <CardMedia
                component="img"
                src="https://media.tenor.com/oH7PTL1exVMAAAAM/really-smh.gif"
              />
            </Card>
          </Center>
          <Typography variant="h4" align="center">
            It has been determined that you should never own a pet.
          </Typography>
          <Typography
            variant="h4"
            align="center"
            sx={{ padding: '50px', fontSize: '75px' }}
          >
            <em>Be Gone From This Site!!!</em>
          </Typography>
          {/* </Contain> */}
        </div>
      );
    }

    return (
      <div>
        <Typography
          variant="h3"
          align="center"
          style={{
					  color: '#eee3cb',
					  border: '1px solid black',
					  backgroundColor: '#375E3D',
          }}
        >
          {' '}
          You should get a
          {' '}
          {result.toUpperCase()}
          !
          {' '}
        </Typography>
        <Center>
          <Adoption animalData={resultPet} />
        </Center>
      </div>
    );
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
  return <Container>{response()}</Container>;
}

export default Result;
