import React from 'react';
import axios from 'axios';
import {
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from '@mui/material';
import {
  Link, useNavigate, Outlet, useLocation,
} from 'react-router-dom';

function RoulettePick() {
  const navigate = useNavigate();

  return (
    <div>
      <p>TESTING TESTING</p>
      <button type="button" onClick={() => navigate('/wheel')}>
        Start THE WHEEL
      </button>
    </div>
  );
}
export default RoulettePick;
