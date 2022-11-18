import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styled from 'styled-components';

const CenterDiv = styled.div`
	margin: auto;
	width: 50%;
`;

const CenterButt = styled.div`
	margin-left: 10%;
	width: 100%;
`;

function QuizIntro({ setView }) {
  return (
    <CenterDiv>
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
    </CenterDiv>
  );
}

export default QuizIntro;
