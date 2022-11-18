import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Container } from '@mui/material';
import Questionaire from './Questionaire/Questionaire.jsx';
import QuizIntro from './QuizIntro.jsx';
import Result from './Result.jsx';

const Contain = styled(Container)`
	background-color: aliceblue;
	padding: 10%;
	height: 100%;
	opacity: 95%;
	margin: auto;
	width: 50%;
`;

function Quiz() {
  const [result, setResult] = useState(''); // current question rendered
  const [view, setView] = useState('quizIntro');

  const renderView = () => {
    // change the view on the page depending on state
    if (view === 'questionaire') {
      // taking the quiz
      return <Questionaire setResult={setResult} setView={setView} />;
    }
    if (view === 'result') {
      // retriving the result
      return <Result result={result} />;
    }
    if (view === 'quizIntro') {
      return <QuizIntro setView={setView} />;
    }
  };

  return (
    <Contain fixed>
      <div>
        <Typography variant="h1" align="center">
          Perfect Pet Picker
        </Typography>
        <br />
        <div>{renderView()}</div>
      </div>
    </Contain>
  );
}

export default Quiz;
