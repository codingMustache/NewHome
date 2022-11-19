import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Breed = styled.div`
	border: 0.5px solid black;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	background-color: #ddd0b3;
	box-shadow: 0 0 5px black;
	width: 200px;
	height: 200px;
	:hover {
		background-color: #b8ae97;
		box-shadow: none;
	}
	img {
		border-radius: 10px;
		object-fit: cover;
		height: 150px;
		width: 150px;
	}
	p {
		display: flex;
		justify-content: center;
		inline-size: 200px;
		font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}
`;

function BreedInfoEntry({ breed }) {
  return (
    <Link to="/breedCard" state={breed}>
      <Breed>
        <img src={breed.image.url} alt={breed.name} height="100" />
        <p>{breed.name}</p>
      </Breed>
    </Link>
  );
}
export default BreedInfoEntry;
