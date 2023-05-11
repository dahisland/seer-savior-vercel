import React, { useContext } from "react";
import { gameLevelsData } from "../../../data/game/gameLevelsData";
import { useSelector } from "react-redux";
import { GameContext } from "../GameplayerProvider";
import GameplayerButton from "../gameplayerButton/GameplayerButton";

const ChooseLevel = ({ setGameBackground }) => {
  const { userConnected, profile } = useSelector((state) => state.user);

  const { gameDisplay, setGameDisplay, setLevel, resetStates } =
    useContext(GameContext);

  function navigateToChosenLevel(lvl) {
    resetStates();
    setLevel(lvl);
    setGameDisplay("levelintro");
  }

  function returnToPregame() {
    resetStates();
    setGameBackground("lighten");
    setGameDisplay("pregame");
  }

  return userConnected ? (
    <div
      className={
        gameDisplay === "chooselevel"
          ? "gameplayer_chooseLevel"
          : "gameplayer_chooseLevel--disappear"
      }
    >
      <div className="gameplayer_content chooseLevel_content">
        <h2>CHOOSE LEVEL</h2>
        <div className="chooseLevel_levels">
          {gameLevelsData
            .sort((a, b) => a.level - b.level)
            .map((item, index) =>
              profile.scores.findIndex(
                (score) => score.level + 1 === item.level
              ) === -1 && item.level !== 1 ? (
                <div
                  className="chooseLevel_item chooseLevel_item--disabled"
                  key={"choose-level-" + index}
                >
                  {item.level}
                </div>
              ) : (
                <div
                  className="chooseLevel_item chooseLevel_item--available"
                  key={"choose-level-" + index}
                  onClick={
                    gameDisplay === "chooselevel"
                      ? () => navigateToChosenLevel(item.level)
                      : null
                  }
                >
                  {item.level}
                </div>
              )
            )}
        </div>
        <GameplayerButton
          btnHandleClick={
            gameDisplay === "chooselevel" ? () => returnToPregame() : null
          }
          btnClass={"level_button cancel_button"}
          btnValue={"Cancel"}
        />
      </div>
    </div>
  ) : null;
};

export default ChooseLevel;
