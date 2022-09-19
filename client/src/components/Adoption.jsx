import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from '../UserContext.jsx';

function Adoption({ animalData }) {
  const {
    user, savedList, setSavedList, isClicked, setClick,
  } =		useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isThere, setThere] = useState(false);
  const navigate = useNavigate();

  // on click render individual petview
  const handleEntryClick = () => navigate('/petview', { state: { animalData } });

  const handleUnsave = (e) => {
    setThere(false);

    axios
      .delete('/pet/savePet', {
        data: {
          userId: user.id,
          _id: animalData._id,
        },
      })
      .then((data) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSavePet = (e) => {
    setClick(() => {
      const afterClicked = isClicked;
      afterClicked.push(animalData._id);
      return afterClicked;
    });

    setThere(true);
    // check if user is logged in, and button id;
    if (!loggedIn) {
      // direct a user to log in to save/follow pets
      window.alert('Please sign up/login');
    } else {
      // axios request for saving a pet
      animalData.userId = user.id;
      axios
        .post('/pet/savePet', {
          pet: animalData,
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
    }
  };

  useEffect(
    () => (user !== null ? setLoggedIn(true) : setLoggedIn(false)),

    [loggedIn],
  );
  useEffect(() => {
    if (savedList !== null) {
      savedList.forEach((savedPet) => {
        if (savedPet._id === animalData._id) {
          setThere(true);
        }
      });
    }
  }, []);

  return (
    <Card raised sx={{ width: '40vw' }}>
      {(() => {
			  if (animalData.photo) {
			    return <CardMedia component="img" image={animalData.photo} alt="" />;
			  }
      })()}

      <CardContent style={{ backgroundColor: '#E3C770' }}>
        <Typography gutterBottom variant="h5" component="div">
          {animalData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {animalData.description}
        </Typography>
      </CardContent>
      <CardActions style={{ backgroundColor: '#A64B2A' }}>
        <Button
          style={{ backgroundColor: '#FCFFE7', color: '#DEA057' }}
          size="small"
          id="viewpet"
          onClick={handleEntryClick}
        >
          view more
        </Button>
        {user ? (
				  isThere ? (
  <IconButton
    id="save"
    aria-label="add to favorites"
    onClick={(e) => {
							  handleUnsave(e);
    }}
  >
    <FavoriteIcon style={{ color: 'purple' }} size="small" />
  </IconButton>
				  ) : (
  <IconButton
    id="save"
    aria-label="add to favorites"
    onClick={(e) => {
							  handleSavePet(e);
    }}
  >
    <FavoriteIcon style={{ color: '#DEA057' }} size="small" />
  </IconButton>
				  )
        ) : (
          <IconButton
            disabled="true"
            id="save"
            aria-label="add to favorites"
            onClick={(e) => {
						  handleSavePet(e);
            }}
          >
            <FavoriteIcon style={{ color: '#DEA057' }} size="small" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
Adoption.propTypes = {
  animalData: PropTypes.object.isRequired,
};
export default Adoption;
