import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import Rabbatog from './Rabbatog.png';

const CenterButt = styled.div`
	margin-left: 30%;
	width: 100%;
`;

function QuizIntro({ setView }) {
  return (
    <Container>
      <img src={Rabbatog} alt="Rabbatog" />
      <br />
      <Typography variant="h6" align="center">
        Dogs, rabbits and cats. Oh my! All of them are cute and cuddly, but
        which animal is most suited to your personality?
      </Typography>
      <br />
      <CenterButt>
        <Button
          variant="contained"
          mt={2}
          sx={{ display: 'inline-block', margin: 'auto' }}
          type="button"
          onClick={() => {
					  setView('questionaire');
          }}
        >
          Ready to Find Out Which Animal is the One For You?
        </Button>
      </CenterButt>
    </Container>
  );
}

export default QuizIntro;
