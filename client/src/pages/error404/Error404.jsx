import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LogModale from "../../components/logModale/LogModale";
import EditProfileModale from "../../components/editProfileModale/EditProfileModale";
import BackgroundAnim from "../../components/backgroundAnim/BackgroundAnim";

const Error404 = () => {
  const [modaleDisplay, setModaleDisplay] = useState(false);
  const { userConnected } = useSelector((state) => state.user);

  return (
    <div className="page-container">
      <BackgroundAnim />
      <Header setModaleDisplay={setModaleDisplay} />
      <main id="main_error404">
        <h1 id="title_error404">Error 404</h1>
        <div className="error404_content">
          <p>Ooops !</p>
          <p>It seems that your intuition has led you to a dead end...</p>
        </div>
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

export default Error404;
