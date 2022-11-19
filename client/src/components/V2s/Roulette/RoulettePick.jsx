import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const componentBody = styled.div`
	display: flex;
	flex-direction: column;
`;
function RoulettePick() {
  const [user, setUser] = useState({});
  const [animals, setAnimals] = useState([]);
  const [choiceMade, setChoiceMade] = useState(false);

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
    setChoiceMade(true);
  };

  useEffect(() => {
    retriveUserData();
  }, []);

  return (
    <componentBody>
      <Box>
        <Typography variant="h3">
          How To Use
          <Typography color="#000" variant="subtitle1">
            <div>Select how you would like the wheel to be filled.</div>
            <br />
            <div>
              Once an animal is chosen a link will be provided to adobt the
              animal
            </div>
          </Typography>
        </Typography>
      </Box>
      <Grid container spacing={12}>
        <Button
          style={{ backgroundColor: '#DEA057', color: '#000' }}
          size="large"
          onClick={useSaved}
        >
          Use Saved Animals
        </Button>
        <br />
        <Link
          to="/wheel"
          state={{
					  wheelArray: animals.map((a) => a.name),
					  animalObjs: animals,
          }}
        >
          {choiceMade ? (
            <Button
              size="large"
              style={{ backgroundColor: '#DEA057', color: '#000' }}
            >
              Start THE WHEEL
            </Button>
          ) : null}
        </Link>
      </Grid>
    </componentBody>
  );
}
export default RoulettePick;
