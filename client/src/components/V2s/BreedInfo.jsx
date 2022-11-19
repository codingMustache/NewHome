import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BreedInfoEntry from './BreedInfoEntry.jsx';

const BreedBody = styled.div`
	h1 {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	background-color: #eee3cb;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 15px;
	border: 1px solid black;
	padding: 10px;
`;

function BreedInfo() {
  const [breeds, setBreeds] = useState([]);

  const renderBreeds = () => {
    // axios Req to get breed and images
    axios
      .get('/breeds')
      .then((data) => setBreeds(data.data))
      .catch((err) => console.error('Error from get Breeds: ', err));
  };

  useEffect(renderBreeds, []);

  return (
    <BreedBody>
      <h1>Breed Info</h1>
      {breeds.map((breed) => (
        <BreedInfoEntry breed={breed} key={breed.id} />
      ))}
    </BreedBody>
  );
}
export default BreedInfo;
