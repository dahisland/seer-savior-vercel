import React from "react";
import { gameLevelsData } from "../../data/game/gameLevelsData";
import { GiLaurels } from "react-icons/gi";
import RankingScore from "./rankingScore/RankingScore";
import RankingPseudo from "./rankingPseudo/RankingPseudo";

const RankingContainer = ({ rankingData, noRankingData }) => {
  function filteredRankingData(lvl, rankingData) {
    let currentRanking = null;
    if (rankingData) {
      const rankingFiltered = rankingData.filter((item) => item.level === lvl);
      if (rankingFiltered.length !== 0) {
        currentRanking = rankingFiltered[0];
      }
    }
    return currentRanking;
  }

  return (
    <div className="ranking_container">
      <React.Fragment>
        {gameLevelsData.map((item, index) => (
          <div className="ranking_item" key={"ranking-item-" + index}>
            <div className="rankingItem_level">
              <p>{"LEVEL " + item.level}</p>
            </div>
            <RankingScore
              objRankingData={filteredRankingData(item.level, rankingData)}
            />
            <RankingPseudo
              objRankingData={filteredRankingData(item.level, rankingData)}
              noRankingData={noRankingData}
            />
            <div className="rankingItem_icon">
              <GiLaurels />
            </div>
          </div>
        ))}
      </React.Fragment>
    </div>
  );
};

export default RankingContainer;
