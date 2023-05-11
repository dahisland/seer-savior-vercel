import React, { useContext } from "react";
import { GameContext } from "../GameplayerProvider";
import { useSelector } from "react-redux";
import { BsPlayCircleFill } from "react-icons/bs";
import { gameLevelsData } from "../../../data/game/gameLevelsData";

const Pregame = ({ setGameBackground }) => {
  const { userConnected, profile } = useSelector((state) => state.user);

  const { gameDisplay, setGameDisplay, resetStates } = useContext(GameContext);

  function navigateToRules(userConnected, profile) {
    resetStates();
    setGameBackground("darken");
    // Navigate to game content rules
    userConnected && gameLevelsData.length === profile.scores.length
      ? setGameDisplay("chooselevel")
      : setGameDisplay("gamerules");
  }

  return (
    <div
      className={
        gameDisplay === "pregame"
          ? "gameplayer_pregame"
          : "gameplayer_pregame--disappear"
      }
    >
      <h2 className="pregame_title">Are you ready to seer ?</h2>
      <picture
        onClick={
          gameDisplay === "pregame"
            ? () => navigateToRules(userConnected, profile)
            : null
        }
      >
        <BsPlayCircleFill className={"icon--playgame"} />
      </picture>
    </div>
  );
};

export default Pregame;
