import React, { useContext, useEffect } from "react";
import { GameContext } from "../GameplayerProvider";
import LeveLHeader from "../levelHeader/LeveLHeader";
import { getIntuitions } from "../../../utils/gameAlgorithms/randomNumberByLevel.export";
import IntuitionsContainer from "./IntuitionsContainer";
import ClueContainer from "./ClueContainer";
import SubmitIntuition from "./SubmitIntuition";

const LevelGame = () => {
  const { gameDisplay, level, numbersTested, setIntuitions, intuitions } =
    useContext(GameContext);

  useEffect(() => {
    // Avoid intuitions repetitions or intuitions already suggested
    if (intuitions !== null) {
      if (
        intuitions[0] === intuitions[1] ||
        numbersTested.includes(intuitions[0].number) ||
        numbersTested.includes(intuitions[1].number)
      ) {
        const generateIntuitions = getIntuitions(level, numbersTested);
        setIntuitions(generateIntuitions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intuitions]);

  return (
    <div
      className={
        gameDisplay === "levelgame"
          ? "gameplayer_levelGame"
          : "gameplayer_levelGame--disappear"
      }
    >
      <div className="gameplayer_content levelGame_content">
        <LeveLHeader />
        <div className="levelGame_gameplay">
          <ClueContainer />
          <IntuitionsContainer />
        </div>
        <SubmitIntuition />
      </div>
    </div>
  );
};

export default LevelGame;
