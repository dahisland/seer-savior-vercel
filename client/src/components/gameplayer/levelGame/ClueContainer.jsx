import React, { useContext } from "react";
import { GameContext } from "../GameplayerProvider";

const ClueContainer = () => {
  const { clue } = useContext(GameContext);

  return (
    <div className="levelGame_clueContainer">
      {clue ? (
        <div className="levelGame_clue">
          <p>{clue.proposition} ? </p>
          <p>{clue.clue}</p>
        </div>
      ) : (
        "Follow your intuition..."
      )}
    </div>
  );
};

export default ClueContainer;
