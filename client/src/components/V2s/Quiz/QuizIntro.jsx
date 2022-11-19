import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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
