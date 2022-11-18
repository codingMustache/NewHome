import React from 'react';
import Button from '@mui/material/Button';
import Question from './Question.jsx';
import quizData from './quizData.js';

function Questions() {
  return (
    <form>
      {quizData.map((question) => (
        <div>
          <Question question={question} />
          <br />
        </div>
      ))}
      <Button type="submit" variant="outlined">
        Submit Answer
      </Button>
    </form>
  );
}

export default Questions;
