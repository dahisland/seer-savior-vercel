import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LogModale from "../../components/logModale/LogModale";
import EditProfileModale from "../../components/editProfileModale/EditProfileModale";
import axios from "axios";
import { baseApiURL, rankingEndpoint } from "../../api/urls";
import BackgroundAnim from "../../components/backgroundAnim/BackgroundAnim";
import RankingContainer from "../../components/rankingContainer/RankingContainer";

const Ranking = () => {
  const { userConnected } = useSelector((state) => state.user);

  const [modaleDisplay, setModaleDisplay] = useState(false);
  const [rankingData, setRankingData] = useState(null);
  const [noRankingData, setNoRankingData] = useState("No Seer-savior yet");

  async function getRanking() {
    setNoRankingData("No Seer-savior yet");
    try {
      let response = await axios.get(baseApiURL + rankingEndpoint, {
        withCredentials: true,
      });
      const data = response.data;
      if (data.data) {
        setRankingData(data.data);
      } else {
        setRankingData(null);
      }
    } catch (err) {
      console.log(err);
      setNoRankingData("Server error");
      setRankingData(null);
    }
  }

  useEffect(() => {
    getRanking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-container">
      <BackgroundAnim />
      <Header setModaleDisplay={setModaleDisplay} />

      <main className="main_ranking">
        <h1>SEERS MASTERS</h1>
        <RankingContainer
          rankingData={rankingData}
          noRankingData={noRankingData}
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

export default Ranking;
