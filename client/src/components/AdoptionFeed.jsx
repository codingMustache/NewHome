import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';
import Adoption from './Adoption.jsx';
import Loading from './Loading.jsx';
import styles from '../styles.jsx';
import { UserContext } from '../UserContext.jsx';

function AdoptionFeed() {
  const [animals, setAnimals] = useState([]);
  const [fetchedAnimals, setFetchedAnimals] = useState(false);

  useEffect(() => {
    axios
      .get('/feed/api')
      .then(({ data }) => {
        setAnimals(data.animals);
      })
      .then(() => {
        setFetchedAnimals(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetchedAnimals]);

  const updateAnimals = () => {
    setTimeout(() => {
      axios
        .get('/feed/api')
        .then(({ data }) => {
          setAnimals(data.animals);
          updateAnimals();
        })
        .catch((err) => {
          console.error(err);
        });
    }, 6000000);
  };
  updateAnimals();

  if (animals.length) {
    // console.log('single animal obj', animals[0]);
    return (
      <Box>
        <Typography variant="h3">
          Welcome to NewHome
          <Typography color="#228B22" variant="subtitle1">
            Where you can give those little sonsofguns a new dang ole home
          </Typography>
        </Typography>
        <Grid
          container
          xs={8}
          xl={8}
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={8}
        >
          {animals.map((animal) => (
            <Grid item key={JSON.stringify(animal)} xs={6} xl={6}>
              <Adoption animalsData={animal} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  return <Loading />;
}
export default AdoptionFeed;

// figure out loading functionalitiy
// put mapping through instances of entries in this function
//  <Adoption animalsData={animals[0]} /> <br></br>
// if animalsData (exists) return the <Adoption />
// else if if doesn't render loading animation from material UI
// useEffect(() => {
//   const getAllAnimals = function () {

//     getAllAnimals();

//   }, [animals]);
