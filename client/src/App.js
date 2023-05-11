import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Homepage from "./pages/homepage/Homepage";
import Error404 from "./pages/error404/Error404";
import Avatars from "./pages/avatars/Avatars";
import Ranking from "./pages/ranking/Ranking";
import { actionRemoveCookies } from "./redux/actions/user/removeCookies.action";
import { actionGetProfile } from "./redux/actions/user/getProfile.action";
import { actionControlToken } from "./redux/actions/user/controlToken.action";

function App() {
  const { userConnected } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function getProfile(dispatch, userConnected) {
    // action to store user profile in redux store
    const getProfile = await actionGetProfile(dispatch, userConnected);
    if (getProfile.error) {
      console.log("Error get profile : " + getProfile.data);
      actionRemoveCookies(dispatch);
    }
  }

  // Control if user is connected and get profile data
  useEffect(() => {
    actionControlToken(dispatch, userConnected);
    if (userConnected !== null) {
      getProfile(dispatch, userConnected);
    }
  }, [userConnected, dispatch]);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/avatars" element={<Avatars />} />
        <Route exact path="/ranking" element={<Ranking />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
