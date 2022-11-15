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
  Divider,
} from '@mui/material';
import axios from 'axios';

function ListEntry({ pet }) {
  const navigate = useNavigate();

  const handleClick = () => navigate('/petview', { state: { animalData: pet } });

  return (
    <span>
      <ListItem alignItems="flex-start" onClick={handleClick}>
        <ListItemAvatar>
          <Avatar alt="" src={pet.photo ? pet.photo : null} />
        </ListItemAvatar>
        <ListItemText
          primary={pet.name}
          secondary={(
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="#EEE3CB"
            >
              {`${pet.species}`}
              {` — Breed: ${pet.breed}  Age: ${pet.age}`}
            </Typography>
    )}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </span>
  );
}

export default ListEntry;
