import React, { useState, useEffect, useContext } from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import { useLocation } from 'react-router-dom';

function TheWheel() {
  const location = useLocation();
  const { wheelArray } = location.state;
  const segColors = ['#EE4040'];
  return (
    <div>
      <p>Spin</p>
      <WheelComponent
        segments={wheelArray}
        segColors={segColors}
        buttonText="Spin"
        onFinished={(winner) => console.log(winner)}
        isOnlyOnce={false}
      />
    </div>
  );
}
export default TheWheel;
