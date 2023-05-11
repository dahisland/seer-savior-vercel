import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateAvatar } from "../../../redux/actions/user/updateAvatar.action";
import { defaultAvatar } from "../../../data/avatarsUrls";

const AvatarUnlocked = ({ currentAvatarUnlocked, itemGameData }) => {
  const { userConnected, profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // API request to update user picture url (toogle to default-avatar/avatar-unlocked on avatar click)
  async function changeAvatar(currentAvatarUnlocked, userConnected, profile) {
    currentAvatarUnlocked.url === profile.picture
      ? await actionUpdateAvatar(dispatch, userConnected, defaultAvatar)
      : await actionUpdateAvatar(
          dispatch,
          userConnected,
          currentAvatarUnlocked.url
        );
  }

  return (
    <React.Fragment>
      <figure
        className={
          currentAvatarUnlocked.url === profile.picture
            ? "avatar_unlocked--selected"
            : "avatar_unlocked"
        }
      >
        <picture>
          <img src={currentAvatarUnlocked.url} alt="avatar unlocked" />
        </picture>
        <figcaption>{currentAvatarUnlocked.name}</figcaption>
      </figure>
      <span
        className="select_avatar"
        onClick={() =>
          changeAvatar(currentAvatarUnlocked, userConnected, profile)
        }
      >
        {currentAvatarUnlocked.url === profile.picture
          ? "Unselect avatar"
          : "Choose " + currentAvatarUnlocked.name + " as current avatar"}
      </span>
    </React.Fragment>
  );
};

export default AvatarUnlocked;
