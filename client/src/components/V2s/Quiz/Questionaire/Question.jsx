/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

const QuestionText = styled(Typography)`
	color: #5d473d;
	font-size: 25%;
`;

const Contain = styled(Container)`
	background-color: #eee3cb;
	padding: 5%;
	height: 30%;
	border-radius: 1%;
	border: 1px solid black;
	margin: auto;
	width: 50%;
	font-size: 25%;
`;

function Question({ question, handleChange }) {
  return (
    <Contain>
      <FormControl
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue={question.answerOptions[0].answerKey}
      >
        <QuestionText variant="h5">{question.questionText}</QuestionText>
        <RadioGroup>
          {question.answerOptions.map((answer, id) => (
            <FormControlLabel
              value={answer.answerKey}
              control={<Radio />}
              label={answer.answerText}
              onChange={handleChange}
              key={`${answer.answerKey} - ${id}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Contain>
  );
}

export default Question;
