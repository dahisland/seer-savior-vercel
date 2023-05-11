import { actionUpdateScores } from "../../../redux/actions/user/updateScores.action";
import {
  baseApiURL,
  rankingEndpoint,
  filterRankingByLevelEndpoint,
} from "../../../api/urls";
import axios from "axios";

function comparePreviousScore(newScore, profile, level, setBestScore) {
  const filterUserScores = profile.scores.filter(
    (item) => item.level === level
  );
  filterUserScores.length !== 0 && filterUserScores[0].score > newScore
    ? setBestScore(filterUserScores[0].score)
    : setBestScore(newScore);
}

export async function updateScoreAndRanking(
  dispatch,
  level,
  userConnected,
  profile,
  gamerScore,
  setBestScore
) {
  const newScore = { level: level, score: gamerScore };

  const updateScores = await actionUpdateScores(
    dispatch,
    userConnected,
    profile,
    newScore
  );
  console.log(updateScores.data);
  comparePreviousScore(gamerScore, profile, level, setBestScore);
}

// Ranking user score if user won and score is better than others ranks scores

async function updateRanking(rankingID, userConnected, currentScore, profile) {
  try {
    let response = await axios.put(
      baseApiURL + rankingEndpoint + "/" + rankingID,
      {
        userId: userConnected,
        score: currentScore,
        userPseudo: profile.pseudo,
      },
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    console.log("update ranking success : " + data);
  } catch (err) {
    console.log("update ranking fail : " + err);
  }
}

async function addNewRanking(userConnected, lvl, currentScore, profile) {
  try {
    let response = await axios.post(
      baseApiURL + rankingEndpoint,
      {
        userId: userConnected,
        score: currentScore,
        level: lvl,
        userPseudo: profile.pseudo,
      },
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    console.log("Add new ranking success : " + data);
  } catch (err) {
    console.log("Add new ranking fail : " + err);
  }
}

export async function verifyRanking(userConnected, lvl, currentScore, profile) {
  try {
    let response = await axios.post(
      baseApiURL + filterRankingByLevelEndpoint,
      { level: lvl },
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    console.log(data);

    if (data.data) {
      const rankingScore = data.data.score;
      const rankingId = data.data._id;
      console.log(rankingScore);
      if (currentScore > rankingScore) {
        await updateRanking(rankingId, userConnected, currentScore, profile);
        return true;
      } else {
        return false;
      }
    } else {
      await addNewRanking(userConnected, lvl, currentScore, profile);
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
