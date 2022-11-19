import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Breed = styled.div`
	border: 0.5px solid black;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px;
	background-color: #ddd0b3;
	box-shadow: 0 0 5px black;
	justify-content: space-evenly;
	img {
		box-shadow: 0 0 5px black;
		border-radius: 10px;
		object-fit: cover;
		height: 300px;
		width: 300px;
	}
	.info {
		display: flex;
		padding: 10px;
		justify-content: center;
		flex-direction: column;
		inline-size: 200px;
		font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}
	button {
		background-color: #baaa87;
		position: absolute;
		left: 20px;
		top: 110px;
		border: 1px solid black;
		border-radius: 5px;
		padding: 5px;
		width: 40px;
		:hover {
			background-color: #a19780;
		}
	}
`;

function BreedCard() {
  const location = useLocation();
  const breed = location.state;
  return (
    <Breed>
      <img src={breed.image.url} alt={breed.name} height="100" />
      <div className="info">
        <h1>{breed.name}</h1>
        <p>
          Bred For:
          {breed.bred_for}
        </p>
        <p>
          Breed Group:
          {breed.breed_group}
        </p>
        <p>
          Breed Size:
          <p>
            Height:
            {breed.height.imperial}
            {' '}
            inches
          </p>
          <p>
            Weight:
            {breed.weight.imperial}
            {' '}
            lbs
          </p>
        </p>
        <p>
          Life-span:
          {breed.life_span}
        </p>
        <p>
          Origin:
          {breed.origin}
        </p>
      </div>
      <Link to="/breedInfo">
        <button type="button">X</button>
      </Link>
    </Breed>
  );
}
export default BreedCard;
