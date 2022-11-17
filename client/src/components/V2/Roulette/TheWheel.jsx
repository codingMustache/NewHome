import axios from 'axios';
import React, { useContext } from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../UserContext.jsx';

function TheWheel() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { wheelArray, animalObjs } = location.state;
  const segColors = ['#EE4040'];

  const adoptWinner = (winnerName) => {
    const winningObj = animalObjs.filter(
      (animal) => animal.name === winnerName,
    )[0];
    axios
      .put(`/pet/${winningObj._id}`, {
        pet: {
          userId: user.id,
          adopted: 'adopted',
        },
      })
      .catch((err) => console.error('error updating pet from client req\n', err));
  };

  return (
    <div>
      <p>Spin</p>
      <WheelComponent
        segments={wheelArray}
        segColors={segColors}
        buttonText="Spin"
        onFinished={(winner) => adoptWinner(winner)}
        isOnlyOnce={false}
      />
    </div>
  );
}
export default TheWheel;
