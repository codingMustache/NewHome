import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from '@mui/material';
import { UserContext } from '../UserContext.jsx';
import PetList from './SavedList.jsx';
// get user data using axios from google and display it on
// this page as a restricted page
// err takes user to login page
function Profile() {
  const {
    user, setUser, savedList, setSavedList,
  } = useContext(UserContext);
  const [haveUser, setHaveUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/proAuth')
      .then(({ data }) => {
        // console.log('data from proAuth', data);
        setUser(data);
        return data;
      })
      .then((data) => {
        setHaveUser(true);
        return axios.post('/user', {
          googleID: data.id,
          firstName: data.name.givenName,
          lastName: data.name.familyName,
          profilePhoto: null,
          email: data.emails[0].value,
        });
      })
      .then(({ data }) => {
        // console.log('inside data response from db', data);
      })
      .catch((err) => {
        console.error(err);
        return navigate('/login');
      });
    if (user !== null) {
      axios
        .get(`/pet/savePet/${user.id}`)
        .then(({ data }) => {
          setSavedList(data);
        })
        .catch((err) => {
          console.error('error on get/pet/savePet\n', err);
        });
    }
  }, [haveUser, navigate]); // return data stringified and stored in state as 'profile'-

  const Logout = () => {
    setUser(null);
    axios
      .get('/logout')
      .then((data) => {})
      .then(() => navigate('/login'))
      .catch((err) => {
        console.error(err);
      });
  };

  if (user === null) {
    return <h3>Must Sign In</h3>;
  }
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Card raised sx={{ width: '15vw' }}>
          <CardMedia component="img" src={user.picture} alt="" />
          <CardContent sx={{ bgcolor: '#E3C770' }}>
            <Typography gutterBottom variant="h5" component="div">
              {user.given_name}
            </Typography>
            <CardActions>
              <Button
                variant="contained"
                mt={2}
                sx={{ display: 'inline-block', margin: 'auto' }}
                href="/login"
                onClick={Logout}
              >
                Logout
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <PetList list={savedList} />
      </Grid>
      {/* <Grid>
				<PetList list={followedList} />
			</Grid>
			<Grid>
				<PetList list={adoptedList} />
			</Grid> */}
    </Grid>
  );
}
export default Profile;
