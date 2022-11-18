import React, { useState } from 'react';
import Question from './Question.jsx';
import questions from './quizData.js';

function Questionaire({ setView, setResult }) {
  const [noPetsCount, setNoPetsCount] = useState(0);
  const [dogCount, setDogCount] = useState(0);
  const [catCount, setCatCount] = useState(0);
  const [rabbitCount, setRabbitCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0); // current question rendered
  const [answer, setAnswer] = useState(''); // set answer

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleClick = () => {
    // handle count
    if (answer === 'dog') {
      setDogCount(dogCount + 1);
    } else if (answer === 'cat') {
      setCatCount(catCount + 1);
    } else if (answer === 'rabbit') {
      setRabbitCount(rabbitCount + 1);
    } else if (answer === 'noPets') {
      setNoPetsCount(noPetsCount + 1);
    }
    // // handle next question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const answers = [
        { type: 'dog', count: dogCount },
        { type: 'cat', count: catCount },
        { type: 'rabbit', count: rabbitCount },
        { type: 'noPets', count: noPetsCount },
      ];

      const sortAnswers = answers.sort((a, b) => b.count - a.count);
      setResult(sortAnswers[0].type);
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
