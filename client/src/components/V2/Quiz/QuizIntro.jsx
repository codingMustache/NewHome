import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import styled from 'styled-components';

const CenterButt = styled.div`
	margin-left: 30%;
	width: 100%;
`;

function QuizIntro({ setView }) {
  return (
    <Container>
      <Typography variant="h3" align="center">
        Welcome to the Quiz!
      </Typography>
      <br />
      <CenterButt>
        <Button
          variant="outlined"
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
