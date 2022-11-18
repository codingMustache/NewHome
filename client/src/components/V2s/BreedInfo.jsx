import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

import BreedInfoEntry from './BreedInfoEntry.jsx';

function BreedInfo() {
  const [breeds, setBreeds] = useState([]);

  const renderBreeds = () => {
    // axios Req to get breed and images
    axios
      .get('/breeds')
      .then((data) => console.log(data))
      .catch((err) => console.error('Error from get Breeds: ', err));
  };

  useEffect(renderBreeds, []);

  return (
    <div>
      <h1>Breed Info</h1>
      <Box
        sx={{
				  bgcolor: '#E3C770',
				  display: 'grid',
				  gap: 1,
				  gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        <BreedInfoEntry />
      </Box>
    </div>
  );
}
export default BreedInfo;
