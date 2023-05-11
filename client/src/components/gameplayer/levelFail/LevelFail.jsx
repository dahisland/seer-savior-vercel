import React, { useContext } from "react";
import { GameContext } from "../GameplayerProvider";
import GameplayerButton from "../gameplayerButton/GameplayerButton";

const LevelFail = () => {
  const { gameDisplay, setGameDisplay, levelData, resetStates } =
    useContext(GameContext);

  function navigateToLevelIntro() {
    resetStates();
    setGameDisplay("levelintro");
  }

  return levelData ? (
    <div
      className={
        gameDisplay === "levelfail"
          ? "gameplayer_levelFail"
          : "gameplayer_levelFail--disappear"
      }
    >
      <div className="gameplayer_content levelFail_content">
        <h2>CASE FAILED</h2>
        <div className="level_text levelFail_text">
          {levelData.fail.map((item, index) => (
            <p key={"levelFail-text-" + index}>{item}</p>
          ))}
        </div>
        <GameplayerButton
          btnHandleClick={
            gameDisplay === "levelfail" ? () => navigateToLevelIntro() : null
          }
          btnClass={"level_button levelFail_button"}
          btnValue={"Try again"}
        />
      </div>
    </div>
  ) : null;
};

export default LevelFail;
