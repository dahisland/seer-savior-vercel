import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateScore } from "../../../utils/gameAlgorithms/calculateScore.function";
import { GameContext } from "../GameplayerProvider";
import GameplayerButton from "../gameplayerButton/GameplayerButton";
import { getIntuitions } from "../../../utils/gameAlgorithms/randomNumberByLevel.export";
import { updateScoreAndRanking } from "./levelGame.functions";
import { verifyRanking } from "./levelGame.functions";

const IntuitionsContainer = () => {
  const { userConnected, profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    levelData,
    gameDisplay,
    setGameDisplay,
    level,
    numbersTested,
    setNumbersTested,
    setIntuitions,
    numberToFind,
    intuitions,
    setClue,
    setCurrentScore,
    setIsRanked,
    resetStates,
    setBestScore,
  } = useContext(GameContext);

  async function proposeIntuition(
    intuition,
    numberToFind,
    numbersTested,
    levelData
  ) {
    // Calculate the number of differents answers possibles for level
    const maxTentatives = levelData.algo[0] / (levelData.algo[1] / 100);

    if (intuition.number === numberToFind.number) {
      // Level is won => calculate score
      // Add + 1 to score because numbersTested state isn't updated by the current tested number
      const gamerScore = calculateScore(levelData, numbersTested.length + 1);

      // If user is connected => update user database, profile store and ranking database if ranked
      if (userConnected) {
        // Request update score
        await updateScoreAndRanking(
          dispatch,
          level,
          userConnected,
          profile,
          gamerScore,
          setBestScore
        );
        // Ranking updating
        const verifyIsRanked = await verifyRanking(
          userConnected,
          level,
          gamerScore,
          profile
        );
        verifyIsRanked ? setIsRanked(true) : setIsRanked(false);
      }

      // Display levelwin content
      setCurrentScore(gamerScore);
      setGameDisplay("levelwin");
    } else {
      // Level isn't won => display clue or levelfail content if it was user last chance
      const beforeLastTentativeNbr = maxTentatives - 3;
      const lastTentativeNbr = maxTentatives - 2;
      const generateIntuitions = getIntuitions(level, numbersTested);

      switch (numbersTested.length) {
        case beforeLastTentativeNbr:
          // One more attempt before failure => Display alert instead of clue
          setClue({
            proposition: intuition.display,
            clue: levelData.clues.lastChance,
          });
          setNumbersTested([...numbersTested, intuition.number]);
          setIntuitions(generateIntuitions);
          break;

        case lastTentativeNbr:
          // Last chance failure => Display levelfail content
          resetStates();
          setGameDisplay("levelfail");
          break;

        default:
          // Wrong proposition - Display a clue and continue playing
          setClue({
            proposition: intuition.display,
            clue:
              intuition.number < numberToFind.number
                ? levelData.clues.more
                : levelData.clues.less,
          });
          // Generate new intuitions to continue playing
          setNumbersTested([...numbersTested, intuition.number]);
          setIntuitions(generateIntuitions);
          break;
      }
    }
  }

  return (
    <div className="levelGame_intuitionsContainer">
      {intuitions
        ? intuitions.map((item, index) => (
            <GameplayerButton
              btnHandleClick={
                gameDisplay === "levelgame"
                  ? () =>
                      proposeIntuition(
                        item,
                        numberToFind,
                        numbersTested,
                        levelData
                      )
                  : null
              }
              btnClass="intuition_content"
              btnValue={item.display}
              key={"intuition-" + index}
            />
          ))
        : null}
      <div className="intuition_shuffle">
        <button
          onClick={() => setIntuitions(getIntuitions(level, numbersTested))}
        >
          I don't feel these
        </button>
      </div>
    </div>
  );
};

export default IntuitionsContainer;
