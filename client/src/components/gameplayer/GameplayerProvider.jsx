import React, { createContext } from "react";
import GameplayerContainer from "./GameplayerContainer";

export const GameContext = createContext({});

const GameplayerProvider = (props) => {
  const value = props;

  return (
    <GameContext.Provider value={value}>
      <GameplayerContainer />
    </GameContext.Provider>
  );
};

export default GameplayerProvider;
