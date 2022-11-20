import {
  Box, Grid, Typography, Button,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../UserContext.jsx';

function TheWheel() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { wheelArray, animalObjs } = location.state;
  const [redirect, setRedirect] = useState({ url: null, bool: false });
  const segColors = ['#EE4040'];

  const adoptWinner = (winnerName) => {
    const winningObj = animalObjs.filter(
      (animal) => animal.name === winnerName,
    )[0];
    axios
      .put(`/pet/${winningObj._id}`, {
        pet: {
          userId: user.id,
          adopted: 'adopted',
        },
      })
      .catch((err) => console.error('error updating pet from client req\n', err));
    setRedirect({ url: winningObj.link, bool: true });
  };

  return (
    <div>
      <Box>
        <Grid container spacing={2}>
          <Typography variant="h3">
            The Wheel Of Adoption!!!
            <Typography color="#000" variant="subtitle1">
              {!wheelArray.length
                ? 'The Wheel is Hungry... add a animal to your saved'
                : ''}
              <WheelComponent
                segments={wheelArray}
                segColors={segColors}
                buttonText="Spin"
                onFinished={(winner) => adoptWinner(winner)}
                isOnlyOnce={false}
              />
              {redirect.bool === true ? (
                <Button
                  style={{ backgroundColor: '#DEA057', color: '#000' }}
                  size="large"
                  href={redirect.url}
                >
                  Go to Adoption Page
                </Button>
              ) : null}
            </Typography>
          </Typography>
        </Grid>
      </Box>
      <p>Spin</p>
    </div>
  );
}
export default TheWheel;
