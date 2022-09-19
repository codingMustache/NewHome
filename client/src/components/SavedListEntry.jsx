// React, Context, useState, useEffect
// material ui box/container, card?
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import axios from 'axios';

function SavedListEntry({ pet, user }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('redirect to petview');
    axios
      .get(`/pet/api/${pet.petId}`)
      .then((data) => {
        console.log('data from api hopefully\n', data);
      })
      .catch((err) => {
        console.error('error getting pet from api\n', err);
      });
    // return navigate('/petview', { state: { animalsData: pet } })
  };

  return (
    <ListItem alignItems="flex-start" onClick={(e) => {}}>
      <ListItemAvatar>
        <Avatar alt="" src={pet.photo ? pet.photo : null} />
      </ListItemAvatar>
      <ListItemText
        primary={`${pet.name}`}
        secondary={(
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`${pet.species}`}
            </Typography>
            {` — Breed: ${pet.breed}  Age: ${pet.age}`}
          </>
   )}
      />
    </ListItem>
  );
}

export default SavedListEntry;
