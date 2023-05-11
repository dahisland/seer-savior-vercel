import React from "react";

const RankingScore = ({ objRankingData }) => {
  return (
    <div className="rankingItem_score">
      <p>{objRankingData ? objRankingData.score : "-"}</p>
    </div>
  );
};

export default RankingScore;
