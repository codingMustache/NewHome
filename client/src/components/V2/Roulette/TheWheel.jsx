import React, { useState, useEffect, useContext } from 'react';
import WheelComponent from 'react-wheel-of-prizes';

function TheWheel() {
  const [animals, setAnimals] = useState([]);
  const segments = [
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'war is bad',
  ];

  const segColors = ['#EE4040'];

  return (
    <div>
      <p>Spin</p>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        buttonText="Spin"
        onFinished={(winner) => console.log(winner)}
        isOnlyOnce={false}
      />
    </div>
  );
}
export default TheWheel;
