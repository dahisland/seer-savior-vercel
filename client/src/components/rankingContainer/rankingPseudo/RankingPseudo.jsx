import React from "react";

const RankingPseudo = ({ objRankingData, noRankingData }) => {
  return (
    <div className="rankingItem_pseudo">
      {objRankingData ? objRankingData.userPseudo : noRankingData}
    </div>
  );
};

export default RankingPseudo;
