import React, { useContext } from "react";
import { GameContext } from "../GameplayerProvider";

const LeveLHeader = () => {
  const { levelData } = useContext(GameContext);
  return levelData ? (
    <div className="level_header">
      <h2>- {levelData.title.toUpperCase()} -</h2>
      <h3>{levelData.name}</h3>
    </div>
  ) : null;
};

export default LeveLHeader;
