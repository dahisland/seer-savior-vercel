import React, { useContext } from "react";
import { GameContext } from "../GameplayerProvider";
import GameplayerButton from "../gameplayerButton/GameplayerButton";

const GameRules = () => {
  const { gameDisplay, setGameDisplay, resetStates } = useContext(GameContext);

  function navigateToLevelIntro() {
    setGameDisplay("levelintro");
    resetStates();
  }

  return (
    <div
      className={
        gameDisplay === "gamerules"
          ? "gameplayer_rules"
          : "gameplayer_rules--disappear"
      }
    >
      <div className="gameplayer_content gameRules_content">
        <h2>Rules</h2>
        <div className="level_text gameRules_text">
          <p>
            To help the police in their investigations, use your gift as a
            medium to give them the crucial information they need. For each
            case, focus on one of the 2 intuitions you feels and then, your gift
            will help you to refine your clairvoyance.
          </p>
          <p>
            At any time, you can choose to contact the police to give them your
            feeling. But beware, your answer will be definitive !
          </p>
          <p>
            Remember, you have to be quick to become the city's Seer Savior.
            Criminals won't waiting for you...
          </p>
        </div>
        <GameplayerButton
          btnHandleClick={
            gameDisplay === "gamerules" ? () => navigateToLevelIntro() : null
          }
          btnClass={"level_button gameRules_button"}
          btnValue={"Become a Seer Savior"}
        />
      </div>
    </div>
  );
};

export default GameRules;
