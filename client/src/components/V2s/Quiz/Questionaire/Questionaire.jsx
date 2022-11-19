import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Question from './Question.jsx';
import questions from './quizData.js';

const QuestionCard = styled(Paper)`
	color: '#A64B2A';
	padding: 20px;
	margin: 5%;
`;

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
    const answers = [
      { type: 'Dog', count: dogCount },
      { type: 'Cat', count: catCount },
      { type: 'Rabbit', count: rabbitCount },
      { type: 'noPets', count: noPetsCount },
    ];

    (function setCount() {
      // handle count
      if (answer === 'Dog') {
        setDogCount(dogCount + 1);
      } else if (answer === 'Cat') {
        setCatCount(catCount + 1);
      } else if (answer === 'Rabbit') {
        setRabbitCount(rabbitCount + 1);
      } else if (answer === 'noPets') {
        setNoPetsCount(noPetsCount + 1);
      }
    }());
    // // handle next question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      for (let i = 0; i < answers.length; i += 1) {
        if (answers[i].type === answer) {
          answers[i].count += 1;
        }
      }
      const sortAnswers = answers.sort((a, b) => b.count - a.count);
      setResult(sortAnswers[0].type);
      setView('result');
    }
  };

  return (
    <QuestionCard>
      <form>
        <Question
          question={questions[currentQuestion]}
          handleChange={handleChange}
        />
        <br />
        <Button type="button" variant="outlined" onClick={handleClick}>
          {' '}
          Submit Answer
          {' '}
        </Button>
      </form>
    </QuestionCard>
  );
}

export default Questionaire;
