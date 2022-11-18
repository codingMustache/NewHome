import React, { useState } from 'react';
import Question from './Question.jsx';
import quizData from './quizData.js';

function Questionaire() {
  const answers = {
    dog: 0,
    cat: 0,
    noPets: 0,
    rabbit: 0,
  };
  const [currentQuestion, setCurrentQuestion] = useState(0); // current question rendered
  const [answer, setAnswer] = useState(''); // answerValue to be changed in State
  const [answerCount, setAnswerCount] = useState(answers); // count of all answers

  // const handleQuizClick = () => { // arg is the chosen value when question is submitted

  // };

  return (
    <div>
      <form>
        <Question question={quizData[currentQuestion]} setAnswer={setAnswer} />
        <button type="button"> Submit Answer </button>
      </form>
    </div>
  );
}

export default Questionaire;
