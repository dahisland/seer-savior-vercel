import React, { useContext } from "react";
import { gameLevelsData } from "../../../data/game/gameLevelsData";
import { useSelector } from "react-redux";
import { GameContext } from "../GameplayerProvider";
import LeveLHeader from "../levelHeader/LeveLHeader";
import GameplayerButton from "../gameplayerButton/GameplayerButton";
import { GiRibbonMedal } from "react-icons/gi";

const LevelWin = () => {
  const { userConnected } = useSelector((state) => state.user);

  const {
    level,
    setLevel,
    gameDisplay,
    setGameDisplay,
    levelData,
    currentScore,
    isRanked,
    resetStates,
    bestScore,
  } = useContext(GameContext);

  function navigateToNextLevel(level, gameLevelsData) {
    if (level + 1 > gameLevelsData.length) {
      resetStates();
      setGameDisplay("nomorelevels");
    } else {
      resetStates();
      setGameDisplay("levelintro");
      setLevel(level + 1);
    }
  }

  return levelData ? (
    <div
      className={
        gameDisplay === "levelwin"
          ? "gameplayer_levelWin"
          : "gameplayer_levelWin--disappear"
      }
    >
      <div className="gameplayer_content levelWin_content">
        <LeveLHeader />
        <div className="levelWin_mainContent">
          <div className="levelWin_rankContainer">
            {userConnected && isRanked ? (
              <p className="levelWin_ranked">!! RANKED !!</p>
            ) : null}
            <picture>
              <GiRibbonMedal className={"icon--win"} />
            </picture>
          </div>

          <div className="levelWin_scoreContainer">
            <h4>Score : {currentScore}</h4>
            {userConnected ? (
              <p className="levelWin_bestScore">Best score : {bestScore}</p>
            ) : null}
          </div>

          <div className="level_text levelWin_text">
            {levelData.success.map((item, index) => (
              <p key={"level-instruction-" + index}>{item}</p>
            ))}
          </div>
        </div>

        <GameplayerButton
          btnHandleClick={
            gameDisplay === "levelwin"
              ? () => navigateToNextLevel(level, gameLevelsData)
              : null
          }
          btnClass={"level_button levelWin_button"}
          btnValue={"Accept a new mission"}
        />
      </div>
    </div>
  ) : null;
};

export default LevelWin;
