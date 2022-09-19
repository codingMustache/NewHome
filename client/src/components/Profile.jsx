import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { Box, Card, Button } from '@mui/material';
import { UserContext } from '../UserContext.jsx';
import SavedList from './SavedList.jsx';
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
    <Box
      sx={{
			  '&:hover': {
			    opacity: [0.9, 0.8, 0.7],
			  },
      }}
    >
      <h1>{`Welcome back...${user.given_name}`}</h1>
      <p>
        <img src={user.picture} width={350} height={350} alt="am-broke" />
      </p>
      <SavedList />
      <Button size="small" href="/login" onClick={Logout}>
        logout
      </Button>
    </Box>
  );
}
// JSON.stringify(profile, null, 2)
export default Profile;
// async (accessToken, refreshToken, profile, done) => {
//   //get the user data from google
//   const newUser = {
//     googleId: profile.id,
//     displayName: profile.displayName,
//     firstName: profile.name.givenName,
//     lastName: profile.name.familyName,
//     image: profile.photos[0].value,
//     email: profile.emails[0].value
//   }

//   try {
//     //find the user in our database
//     let user = await User.findOne({ googleId: profile.id })

//     if (user) {
//       //If user present in our database.
//       done(null, user)
//     } else {
//       // if user is not preset in our database save user data to database.
//       user = await User.create(newUser)
//       done(null, user)
//     }
//   } catch (err) {
//     console.error(err)
//   }
// }
