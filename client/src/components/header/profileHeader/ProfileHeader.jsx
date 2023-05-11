import React from "react";
import { useSelector } from "react-redux";
import avatarNotConnected from "../../../assets/avatar-not-connected.png";

const ProfileHeader = ({ setModaleDisplay }) => {
  const { userConnected, profile } = useSelector((state) => state.user);

  return (
    <div className="header_profile" onClick={() => setModaleDisplay(true)}>
      {userConnected ? (
        <React.Fragment>
          <picture>
            <img src={profile.picture} alt="user avatar" />
          </picture>
          <p>{profile.pseudo}</p>
        </React.Fragment>
      ) : (
        <picture className="avatar_notConnected">
          <img src={avatarNotConnected} alt="user avatar" />
        </picture>
      )}
    </div>
  );
};

export default ProfileHeader;
