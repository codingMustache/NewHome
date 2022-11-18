import React, { useState } from 'react';
import Question from './Question.jsx';
import questions from './quizData.js';

function Questionaire({ setView }) {
  const answers = {
    dog: 0,
    cat: 0,
    noPets: 0,
    rabbit: 0,
  };
  const [currentQuestion, setCurrentQuestion] = useState(0); // current question rendered
  const [answer, setAnswer] = React.useState(''); // set answer

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleClick = () => {
    // handle count
    // console.log(answer);
    // console.log(answers[answer]);
    // answers[answer] += 1;
    // // handle next question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setView('result');
    }
  };

  return (
    <div>
      <form>
        <Question
          question={questions[currentQuestion]}
          handleChange={handleChange}
        />
        <button type="button" onClick={handleClick}>
          {' '}
          Submit Answer
          {' '}
        </button>
      </form>
    </div>
  );
}

export default Questionaire;
