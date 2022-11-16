import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import BreedInfoEntry from './BreedInfoEntry.jsx';

function BreedInfo() {
  const renderBreeds = () => {
    // axios Req to get breed and images
    console.log('test');
  };

  useEffect(renderBreeds, []);

  return (
    <div>
      <h1>Breed Info</h1>
      <Box
        sx={{
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
