import React from 'react';
import { Container, Typography } from '@mui/material';

function Result({ result }) {
  const response = () => {
    if (result === 'noPets') {
      return 'No Pets For You!';
    }
    return `You should get a ${result}!`;
  };

  return (
    <Container>
      <br />
      <Typography variant="h3" align="center">
        {response()}
      </Typography>
    </Container>
  );
}

export default Result;
