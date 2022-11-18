import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Question({ question }) {
  return (
    <div>
      <FormControl>
        <FormLabel>{question.questionText}</FormLabel>
        <RadioGroup>
          <FormControlLabel
            value={question.answerOptions[0].answerKey}
            control={<Radio />}
            label={question.answerOptions[0].answerText}
          />
          <FormControlLabel
            value={question.answerOptions[1].answerKey}
            control={<Radio />}
            label={question.answerOptions[1].answerText}
          />
          <FormControlLabel
            value={question.answerOptions[2].answerKey}
            control={<Radio />}
            label={question.answerOptions[2].answerText}
          />
          <FormControlLabel
            value={question.answerOptions[3].answerKey}
            control={<Radio />}
            label={question.answerOptions[3].answerText}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Question;
