import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameContext } from "../GameplayerProvider";
import InputSubmitIntuition from "./InputSubmitIntuition";
import { bonusScore } from "../../../utils/gameValues";
import { calculateScore } from "../../../utils/gameAlgorithms/calculateScore.function";
import { formatIntuitionSubmitByLevel } from "../../../utils/gameFormatting/formatOnSubmitByLevel.export";
import { updateScoreAndRanking } from "./levelGame.functions";
import { verifyRanking } from "./levelGame.functions";

const SubmitIntuition = () => {
  const { userConnected, profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    levelData,
    level,
    numberToFind,
    numbersTested,
    gameDisplay,
    setGameDisplay,
    setCurrentScore,
    setIsRanked,
    resetStates,
    setBestScore,
  } = useContext(GameContext);

  async function submitIntuition(e, level, userConnected) {
    e.preventDefault();
    const intuitionSubmitted = formatIntuitionSubmitByLevel(e, level);
    if (
      intuitionSubmitted &&
      intuitionSubmitted.number === numberToFind.number
    ) {
      // Level is won => Calculate score
      const gamerScore =
        calculateScore(levelData, numbersTested.length) + bonusScore;

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
      e.target.reset();
    } else {
      // Wrong proposition - Display levelfail content
      resetStates();
      setGameDisplay("levelfail");
      e.target.reset();
    }
  }

  return levelData ? (
    <div className="levelGame_submitIntuition">
      <h4 className="submitIntuition_title">Call the police</h4>
      <form
        className="submitIntuition_form"
        onSubmit={(e) => submitIntuition(e, level, userConnected)}
      >
        {levelData.inputs.unique ? (
          <div className="submitIntuition_field">
            <div className="intuitionField_inputs">
              <InputSubmitIntuition
                inputType={levelData.inputs.type}
                inputPlaceholder={levelData.inputs.placeholder[0]}
                inputAttr={levelData.inputs.attributes[0]}
                inputClass={"submitIntuition_input--unique"}
              />
            </div>
          </div>
        ) : (
          <div className="submitIntuition_field">
            <div className="intuitionField_inputs">
              <InputSubmitIntuition
                inputType={levelData.inputs.type}
                inputPlaceholder={levelData.inputs.placeholder[0]}
                inputAttr={levelData.inputs.attributes[0]}
                inputClass={"submitIntuition_input"}
              />
              <p>{levelData.inputs.unit}</p>
              <InputSubmitIntuition
                inputType={levelData.inputs.type}
                inputPlaceholder={levelData.inputs.placeholder[1]}
                inputAttr={levelData.inputs.attributes[1]}
                inputClass={"submitIntuition_input"}
              />
            </div>
          </div>
        )}
        <input
          type="submit"
          value="911"
          className="submitIntuition--button"
          disabled={gameDisplay === "levelgame" ? false : true}
        />
      </form>
    </div>
  ) : null;
};

export default SubmitIntuition;
