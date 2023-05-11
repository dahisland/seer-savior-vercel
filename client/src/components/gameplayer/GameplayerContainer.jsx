import React, { useState, useContext } from "react";
import { GameContext } from "./GameplayerProvider";
import { useSelector } from "react-redux";
import { BsFillStopCircleFill } from "react-icons/bs";
import GameRules from "./gameRules/GameRules";
import LevelIntro from "./levelIntro/LevelIntro";
import Pregame from "./pregame/Pregame";
import LevelGame from "./levelGame/LevelGame";
import LevelFail from "./levelFail/LevelFail";
import LevelWin from "./levelWin/LevelWin";
import NoMoreLevels from "./noMoreLevels/NoMoreLevels";
import ChooseLevel from "./chooseLevel/ChooseLevel";

const GameplayerContainer = () => {
  const { userConnected } = useSelector((state) => state.user);

  const { gameDisplay, setGameDisplay, resetStates, setModaleDisplay } =
    useContext(GameContext);

  const [gameBackground, setGameBackground] = useState("lighten");

  function chooseALevel() {
    resetStates();
    setGameDisplay("chooselevel");
  }
  function navigateToPregame() {
    resetStates();
    setGameBackground("lighten");
    setGameDisplay("pregame");
  }

  return (
    <div className="gameplayer_container">
      <div
        className={
          gameBackground === "lighten"
            ? "gameplayer_container--lighten"
            : "gameplayer_container--darken"
        }
      >
        <ChooseLevel setGameBackground={setGameBackground} />
        <NoMoreLevels setGameBackground={setGameBackground} />
        <LevelWin setGameBackground={setGameBackground} />
        <LevelFail setGameBackground={setGameBackground} />
        <LevelGame setGameBackground={setGameBackground} />
        <LevelIntro setGameBackground={setGameBackground} />
        <GameRules setGameBackground={setGameBackground} />
        <Pregame setGameBackground={setGameBackground} />

        {userConnected &&
        gameDisplay !== "chooselevel" &&
        gameDisplay !== "levelgame" &&
        gameDisplay !== "nomorelevels" ? (
          <div className="chooseLevel--icon" onClick={() => chooseALevel()}>
            Choose a level
          </div>
        ) : null}

        {!userConnected ? (
          <p className="link_logModale" onClick={() => setModaleDisplay(true)}>
            Login or create account to play with saving progression
          </p>
        ) : null}
      </div>
      {gameDisplay === "levelgame" ||
      gameDisplay === "levelintro" ||
      gameDisplay === "levelfail" ? (
        <picture onClick={() => navigateToPregame()}>
          <BsFillStopCircleFill className={"icon--stopGame"} />
        </picture>
      ) : null}

      <div className="animation-preload-game"></div>
    </div>
  );
};

export default GameplayerContainer;
