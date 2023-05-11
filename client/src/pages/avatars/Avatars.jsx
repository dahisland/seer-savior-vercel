import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LogModale from "../../components/logModale/LogModale";
import EditProfileModale from "../../components/editProfileModale/EditProfileModale";
import { baseApiURL, filterAvatarsByLevelEndpoint } from "../../api/urls";
import axios from "axios";
import AvatarsContainer from "../../components/avatarsContainer/AvatarsContainer";
import BackgroundAnim from "../../components/backgroundAnim/BackgroundAnim";

const Avatars = () => {
  const [modaleDisplay, setModaleDisplay] = useState(false);
  const { userConnected, profile } = useSelector((state) => state.user);
  const [avatarsFiltered, setAvatarsFiltered] = useState(null);

  // API Request to collect only avatars unlocked by user (depends of levels already won)
  async function getFilteredAvatars(profile) {
    const userLevel = profile.scores.length;
    if (userLevel !== 0) {
      try {
        let response = await axios.post(
          baseApiURL + filterAvatarsByLevelEndpoint,
          { level: userLevel },
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        setAvatarsFiltered(data.data);
      } catch (err) {
        setAvatarsFiltered(null);
        console.log(err);
      }
    } else {
      setAvatarsFiltered(null);
    }
  }

  useEffect(() => {
    if (userConnected) {
      getFilteredAvatars(profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConnected, profile]);

  return (
    <div className="page-container">
      <BackgroundAnim />
      <Header setModaleDisplay={setModaleDisplay} />
      <main>
        <h1>SAVIATARS</h1>
        <AvatarsContainer avatarsFiltered={avatarsFiltered} />
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

export default Avatars;
