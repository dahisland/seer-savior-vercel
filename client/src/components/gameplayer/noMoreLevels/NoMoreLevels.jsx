import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { GameContext } from "../GameplayerProvider";
import { BsFillStopCircleFill } from "react-icons/bs";

const NoMoreLevels = ({ setGameBackground }) => {
  const { userConnected } = useSelector((state) => state.user);

  const { gameDisplay, setGameDisplay, resetStates, setLevel } =
    useContext(GameContext);

  function navigateToPregame() {
    resetStates();
    setGameBackground("lighten");
    setLevel(1);
    setGameDisplay("pregame");
  }

  function chooseALevel() {
    resetStates();
    setGameDisplay("chooselevel");
  }
  return (
    <div
      className={
        gameDisplay === "nomorelevels"
          ? "gameplayer_noMoreLevels"
          : "gameplayer_noMoreLevels--disappear"
      }
    >
      <h2 className="noMoreLevels_title">You finished all levels !</h2>

      {userConnected ? (
        <p
          className="noMoreLevels_advice"
          onClick={gameDisplay === "nomorelevels" ? () => chooseALevel() : null}
        >
          You can replay any level at any time to perform your scores
        </p>
      ) : null}

      <picture
        onClick={
          gameDisplay === "nomorelevels" ? () => navigateToPregame() : null
        }
      >
        <BsFillStopCircleFill className={"icon--playgame"} />
      </picture>
    </div>
  );
};

export default NoMoreLevels;
