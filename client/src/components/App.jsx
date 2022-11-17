import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import {
  Link, useNavigate, Outlet, useLocation,
} from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';
import { styles } from '../styles.jsx';
import { UserContext } from '../UserContext.jsx';

// axios get to get the authenticated page from the
// isAuthenticated route in the server then navigates to the react page 'profile'
// if err goes to the login page
function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [value, setVal] = useState(() => location);
  const { user } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setVal(newValue);
    navigate(newValue);
  };
  const handleClick = (e) => {
    if (useLocation.pathname !== e.target.id) {
      setVal(e.target.id);
      navigate(e.target.id);
    }
  };
  return (
  // <>
  // <CssBaseline />
  // <Container fixed>
  //   <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
    <Box sx={styles}>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
          centered
        >
          <Tab
            value="/profile"
            label="Profile"
            onClick={handleClick}
            id="/profile"
          />
          <Tab
            value="/search"
            label="Search"
            onClick={handleClick}
            id="/search"
          />
          <Tab
            value="/home"
            label="Adoptions"
            onClick={handleClick}
            id="/home"
          />
          <Tab
            value="/breedInfo"
            label="Dog Breed Info"
            onClick={handleClick}
            id="/breedInfo"
          />
          <Tab
            value="/petMap"
            label="Pet Map"
            onClick={handleClick}
            id="/petMap"
          />
          <Tab
            value="/roulette"
            label="Pet Roulette"
            onClick={handleClick}
            id="/roulette"
          />
          <Tab
            value="/login"
            label="Pet Quiz"
            onClick={handleClick}
            id="/login"
          />
          <Tab
            value="/login"
            label="ChatRoom"
            onClick={handleClick}
            id="/login"
          />
          {user ? (
            <Tab
              value="/postFeed"
              label="Stories"
              onClick={handleClick}
              id="/postFeed"
            />
          ) : null}
        </Tabs>
      </Box>
      <br />
      <Outlet />
    </Box>
  // </Container>
  // </>
  );
}

export default App;
