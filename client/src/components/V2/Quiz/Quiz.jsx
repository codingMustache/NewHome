import React, { useState } from 'react';
import Questionaire from './Questionaire/Questionaire.jsx';
import QuizIntro from './QuizIntro.jsx';
import Result from './Result.jsx';

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
    <div>
      <div>{renderView()}</div>
    </div>
  );
}

export default Quiz;
