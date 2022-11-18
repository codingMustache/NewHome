import React from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

const QuestionText = styled(Typography)`
	color: #5d473d;
`;

function Question({ question, handleChange }) {
  return (
    <div>
      <FormControl
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue={question.answerOptions[0].answerKey}
      >
        <QuestionText variant="h6">{question.questionText}</QuestionText>
        <RadioGroup>
          {question.answerOptions.map((answer) => (
            <FormControlLabel
              value={answer.answerKey}
              control={<Radio />}
              label={answer.answerText}
              onChange={handleChange}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Question;
