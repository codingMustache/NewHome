import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  ListItem,
  ListItemEntry,
} from '@mui/material';
import { UserContext } from '../UserContext.jsx';
import PostForms from './PostForms.jsx';

// default image, remove later
const image =	'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57334144/1/?bust=1663026743&width=300';

function PetView() {
  const { user, setSavedList, setFollowedList } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [adoptedByUser, setAdoptedByUser] = useState(false);

  // state from feed component
  const { state } = useLocation();
  const animal = state.animalData;
  const [status, setStatus] = useState(animal.adopted);

  // function to save/follow a pet
  const handleSavePet = (e) => {
    // check if user is logged in, and button id;
    if (!loggedIn) {
      // direct a user to log in to save/follow pets
      window.alert('Please sign up/login');
    } else if (e.target.id === 'save') {
      // axios request for favoriting a pet
      const photo = animal.photo ? animal.photo : null;
      animal.userId = user.id;
      axios
        .post('/pet/savePet', {
          pet: animal,
        })
        .then((data) => {
          axios
            .get(`/pet/savePet/${user.id}`)
            .then(({ data }) => {
              setSavedList(data);
            })
            .catch((err) => {
              console.error('error updating pet list\n', err);
            });
        })
        .catch((err) => {
          console.error('error on /pet/savePet req', err);
        });
    } else {
      // axios request for following a pet story
      const photo = animal.photo ? animal.photo : null;
      animal.userId = user.id;
      axios
        .post('/pet/followPet', {
          pet: animal,
        })
        .then((data) => {
          axios
            .get(`/pet/followPet/${user.id}`)
            .then(({ data }) => {
              setFollowedList(data);
            })
            .catch((err) => {
              console.error('error updating pet list\n', err);
            });
        })
        .catch((err) => {
          console.error('error on /pet/savePet req', err);
        });
    }
  };

  // conditional rendering based on pet adoption status
  const onAdoptionStatus = () => {
    // if pet === adopted render follow button, render adoption stories
    if (status === 'adoptable') {
      // render follow button and pet stories
      return (
        <Button
          id="save"
          value="save"
          variant="contained"
          onClick={(e) => handleSavePet(e)}
        >
          Save
        </Button>
      );
    }
    return (
      <Button
        id="follow"
        value="follow"
        variant="contained"
        onClick={(e) => handleSavePet(e)}
      >
        follow
      </Button>
    );
    // render save button
  };

  // render pet photo or a generic photo
  const hasPhoto = () => {
    if (animal.photo) {
      return animal.photo;
    }
    return null;
  };

  // render pet tags, or generic statement
  const hasTags = () => {
    if (animal.tags.length) {
      return animal.tags.map((tag) => (
        <Typography variant="body2" gutterBottom sx={{ color: '#5D473D' }}>
          {tag}
        </Typography>
      ));
    }
    return <p>I&apos;m looking for a new crib with chill people</p>;
  };

  // function to preview adopt functionality
  const handleAdoption = () => {
    // axios put req
    if (user === null) {
      window.alert('sign in to take them to their new Home');
      return;
    }
    setStatus('adopted');
    setAdoptedByUser(true);
    axios
      .put(`/pet/${animal._id}`, {
        pet: {
          userId: user.id,
          adopted: 'adopted',
        },
      })
      .catch((err) => {
        console.error('error updating pet from client req\n', err);
      });

    // use state to overide adoption status?
  };

  useEffect(() => {
    if (user !== null) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (user && user.id === animal.userId) {
      setAdoptedByUser(true);
    }
  }, [status]);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
    >
      <Card raised sx={{ width: '40vw', bgcolor: '#EEE3CB' }}>
        <CardContent sx={{ bgcolor: '#EEE3CB' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#5D473D' }}>
            {`${animal.name} would like to say hello!`}
          </Typography>
          <CardMedia
            component="img"
            image={hasPhoto()}
            alt=""
            sx={{ width: '20vw', height: '150' }}
          />
          <Typography variant="body2" gutterBottom sx={{ color: '#5D473D' }}>
            {`Species: ${animal.species}`}
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ color: '#5D473D' }}>
            {`Breed: ${animal.breed}`}
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ color: '#5D473D' }}>
            {`Age: ${animal.age}`}
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ color: '#5D473D' }}>
            {`Gender: ${animal.gender}`}
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ color: '#5D473D' }}>
            About me:
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: '#5D473D' }}>
            {animal.description}
          </Typography>
          {hasTags()}
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {onAdoptionStatus()}
          {status === 'adoptable' ? (
					  user ? (
  <Button
    onClick={handleAdoption}
    variant="contained"
    href={animal.link}
  >
    Adopt Me!
  </Button>
					  ) : (
  <Button disabled="true" variant="contained">
    Adopt Me!
  </Button>
					  )
          ) : (
            <Button variant="contained" disabled="true">
              Adopted
            </Button>
          )}
        </CardActions>
      </Card>
      {adoptedByUser ? (
        <Box>
          <PostForms animal={animal} />
        </Box>
      ) : null}
    </Box>
  );
}

export default PetView;
