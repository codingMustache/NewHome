import React from 'react';

function QuizIntro({ setView }) {
  return (
    <div>
      <h1>Welcome to the Quiz!</h1>
      <button
        type="button"
        onClick={() => {
				  setView('questionaire');
        }}
      >
        {' '}
        Ready to Take the Quiz?
        {' '}
      </button>
    </div>
  );
}

export default QuizIntro;
