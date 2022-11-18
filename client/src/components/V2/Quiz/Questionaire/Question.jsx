import React from 'react';
import styled from 'styled-components';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

const QuestionText = styled(FormLabel)`
	color: #5d473d;
	font-size: 125%;
`;

function Question({ question, handleChange }) {
  return (
    <div>
      <FormControl
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue={question.answerOptions[0].answerKey}
      >
        <QuestionText>{question.questionText}</QuestionText>
        <RadioGroup>
          <FormControlLabel
            value={question.answerOptions[0].answerKey}
            control={<Radio />}
            label={question.answerOptions[0].answerText}
            onChange={handleChange}
          />
          <FormControlLabel
            value={question.answerOptions[1].answerKey}
            control={<Radio />}
            label={question.answerOptions[1].answerText}
            onChange={handleChange}
          />
          <FormControlLabel
            value={question.answerOptions[2].answerKey}
            control={<Radio />}
            label={question.answerOptions[2].answerText}
            onChange={handleChange}
          />
          <FormControlLabel
            value={question.answerOptions[3].answerKey}
            control={<Radio />}
            label={question.answerOptions[3].answerText}
            onChange={handleChange}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Question;
