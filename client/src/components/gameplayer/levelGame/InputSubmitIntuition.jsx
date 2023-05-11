import React, { useContext } from "react";
import { GameContext } from "../GameplayerProvider";

const InputSubmitIntuition = ({
  inputType,
  inputPlaceholder,
  inputAttr,
  inputClass,
}) => {
  const { levelData } = useContext(GameContext);

  return levelData.inputs.type === "number" ? (
    <input
      type={inputType}
      placeholder={inputPlaceholder}
      min={inputAttr.min}
      max={inputAttr.max}
      step={inputAttr.step}
      className={inputClass}
    />
  ) : (
    <input
      type={inputType}
      placeholder={inputPlaceholder}
      className={inputClass}
    />
  );
};

export default InputSubmitIntuition;
