import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
      <Typography variant="h2" align="center">
        {response()}
      </Typography>
    </Container>
  );
}

export default Result;
