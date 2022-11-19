import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  Button, Typography, Grid, Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

function RoulettePick() {
  const [user, setUser] = useState({});
  const [animals, setAnimals] = useState([]);
  const [choiceMade, setChoiceMade] = useState(false);
  const ComponentBody = styled.div`
		display: flex;
		flex-direction: column;
	`;
  const ButtonStyles = styled.div`
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		width: calc(100% + 96px);
		align-content: center;
		justify-content: center;
	`;
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

  /**
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: calc(100% + 96px);
    align-content: center;
    justify-content: center;
} */

  return (
    <ComponentBody>
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
        <ButtonStyles>
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
        </ButtonStyles>
      </Grid>
    </ComponentBody>
  );
}
export default RoulettePick;
