import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Box, Button, Grid } from '@mui/material';

// page that opens when refreshed/initialized
// goes to the google auth page to give user option to sign in with their google account
function Login() {
  return (
    <Grid container xs={4}>
      <Grid item xs={4}>
        <h1>Sign in</h1>
        <Button
          variant="contained"
          mt={2}
          sx={{ display: 'inline-block', margin: 'auto' }}
          href="/login"
        >
          <a href="/auth/google">Sign In</a>
        </Button>
      </Grid>
      <Grid>
        <h1>Sign Up</h1>
        <Button
          variant="contained"
          mt={2}
          sx={{ display: 'inline-block', margin: 'auto' }}
          href="/login"
        >
          <a href="/auth/google">Sign Up</a>
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
