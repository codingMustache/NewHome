// import React from 'react';
// import {
//   Radio, RadioGroup, FormControl, FormControlLabel, FormLabel,
// } from '@mui/material';

// function Question({ question, setAnswer }) {
//   return (
//     <div>
//       <FormControl>
//         <FormLabel>{question.questionText}</FormLabel>
//         <RadioGroup>
//           <FormControlLabel
//             value={question.answerOptions[0].answerKey}
//             control={<Radio />}
//             label={question.answerOptions[0].answerText}
//             onChange={(e) => { setAnswer(e.value); console.log('hi'); }}
//           />
//           <FormControlLabel
//             value={question.answerOptions[1].answerKey}
//             control={<Radio />}
//             label={question.answerOptions[1].answerText}
//           />
//           <FormControlLabel
//             value={question.answerOptions[2].answerKey}
//             control={<Radio />}
//             label={question.answerOptions[2].answerText}
//           />
//           <FormControlLabel
//             value={question.answerOptions[3].answerKey}
//             control={<Radio />}
//             label={question.answerOptions[3].answerText}
//           />
//         </RadioGroup>
//       </FormControl>
//     </div>
//   );
// }

// export default Question;
