import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Questionaire from './Questionaire/Questionaire.jsx';
import QuizIntro from './QuizIntro.jsx';
import Result from './Result.jsx';

const Contain = styled(Container)`
	background-color: #eee3cb;
	padding: 10%;
	height: 40%;
	border-radius: 1%;
	border: 1px solid black;
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
        <Typography variant="h2" align="center">
          Perfect Pet Picker
        </Typography>
        <br />
        <div>{renderView()}</div>
      </div>
    </Contain>
  );
}

export default Quiz;
