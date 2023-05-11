import React from "react";

const GameplayerButton = ({ btnHandleClick, btnClass, btnValue }) => {
  return (
    <button onClick={btnHandleClick} className={btnClass}>
      {btnValue}
    </button>
  );
};

export default GameplayerButton;
