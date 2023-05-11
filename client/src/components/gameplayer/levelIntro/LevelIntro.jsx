import React, { useContext } from "react";
import { GameContext } from "../GameplayerProvider";
import LeveLHeader from "../levelHeader/LeveLHeader";
import GameplayerButton from "../gameplayerButton/GameplayerButton";
import {
  getNumberToFind,
  getIntuitions,
} from "../../../utils/gameAlgorithms/randomNumberByLevel.export";

const LevelIntro = () => {
  const {
    gameDisplay,
    levelData,
    setGameDisplay,
    setNumberToFind,
    level,
    numbersTested,
    setIntuitions,
  } = useContext(GameContext);

  function navigateToLevelGame() {
    const generateNumberToFind = getNumberToFind(level);
    setNumberToFind(generateNumberToFind);
    const generateIntuitions = getIntuitions(level, numbersTested);
    setIntuitions(generateIntuitions);
    setGameDisplay("levelgame");
  }

  return levelData ? (
    <div
      className={
        gameDisplay === "levelintro"
          ? "gameplayer_levelIntro"
          : "gameplayer_levelIntro--disappear"
      }
    >
      <div className="gameplayer_content levelIntro_content">
        <LeveLHeader />
        <div className="level_text levelIntro_text">
          {levelData.instructions.txt.map((item, index) => (
            <p key={"level-instruction-" + index}>{item}</p>
          ))}
          <p className="levelIntro_toFind">
            To find : {levelData.instructions.toFind}
          </p>
        </div>
        <GameplayerButton
          btnHandleClick={
            gameDisplay === "levelintro" ? () => navigateToLevelGame() : null
          }
          btnClass={"level_button levelIntro_button"}
          btnValue={"Let's guess !"}
        />
      </div>
    </div>
  ) : null;
};

export default LevelIntro;
