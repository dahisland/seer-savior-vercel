import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { gameLevelsData } from "../../data/game/gameLevelsData";
import LogModale from "../../components/logModale/LogModale";
import EditProfileModale from "../../components/editProfileModale/EditProfileModale";
import GameplayerProvider from "../../components/gameplayer/GameplayerProvider";
import BackgroundAnim from "../../components/backgroundAnim/BackgroundAnim";

const Homepage = () => {
  const { userConnected, profile } = useSelector((state) => state.user);

  const [modaleDisplay, setModaleDisplay] = useState(false);

  const [level, setLevel] = useState(1);
  const [levelData, setLevelData] = useState(null);
  const [gameDisplay, setGameDisplay] = useState("pregame");
  const [numbersTested, setNumbersTested] = useState([]);
  const [intuitions, setIntuitions] = useState(null);
  const [numberToFind, setNumberToFind] = useState(null);
  const [numberProposed, setNumberProposed] = useState(null);
  const [clue, setClue] = useState(null);
  const [currentScore, setCurrentScore] = useState(null);
  const [bestScore, setBestScore] = useState(null);
  const [isRanked, setIsRanked] = useState(false);

  function resetStates() {
    setNumbersTested([]);
    setIntuitions(null);
    setNumberToFind(null);
    setNumberProposed(null);
    setCurrentScore(null);
    setClue(null);
    setIsRanked(false);
  }

  function getLevelfromUserScores(setLevel) {
    // Update level to charge according to user profile data
    const profileScores = profile.scores;
    const userLevel = profileScores.length;
    if (
      profileScores.length !== 0 &&
      profileScores.length < gameLevelsData.length
    ) {
      setLevel(userLevel + 1);
    } else {
      setLevel(1);
    }
  }

  // Set level (if user is connected, depends on levels already played)
  useEffect(() => {
    if (userConnected !== null) {
      getLevelfromUserScores(setLevel);
    } else {
      setLevel(1);
    }
    setGameDisplay("pregame");
    resetStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConnected]);

  // Charge new level data each time user finish a level
  useEffect(() => {
    setLevelData(gameLevelsData.filter((item) => item.level === level)[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  return (
    <div className="page-container">
      <BackgroundAnim />
      <Header setModaleDisplay={setModaleDisplay} />
      <main>
        <h1>THE GAME</h1>
        <GameplayerProvider
          level={level}
          setLevel={setLevel}
          levelData={levelData}
          setLevelData={setLevelData}
          gameDisplay={gameDisplay}
          setGameDisplay={setGameDisplay}
          numberToFind={numberToFind}
          setNumberToFind={setNumberToFind}
          numbersTested={numbersTested}
          setNumbersTested={setNumbersTested}
          intuitions={intuitions}
          setIntuitions={setIntuitions}
          numberProposed={numberProposed}
          setNumberProposed={setNumberProposed}
          clue={clue}
          setClue={setClue}
          currentScore={currentScore}
          setCurrentScore={setCurrentScore}
          isRanked={isRanked}
          setIsRanked={setIsRanked}
          resetStates={resetStates}
          modaleDisplay={modaleDisplay}
          setModaleDisplay={setModaleDisplay}
          bestScore={bestScore}
          setBestScore={setBestScore}
        />
      </main>
      <Footer />

      {modaleDisplay ? (
        userConnected === null ? (
          <LogModale setModaleDisplay={setModaleDisplay} />
        ) : (
          <EditProfileModale setModaleDisplay={setModaleDisplay} />
        )
      ) : null}
    </div>
  );
};

export default Homepage;
