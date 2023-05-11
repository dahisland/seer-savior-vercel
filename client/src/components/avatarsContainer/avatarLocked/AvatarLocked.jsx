import React from "react";
import { defaultAvatar } from "../../../data/avatarsUrls";

const AvatarLocked = ({ itemGameData }) => {
  return (
    <figure className="avatar_locked">
      <picture>
        <img src={defaultAvatar} alt="avatar locked" />
      </picture>
      <figcaption>Win level {itemGameData.level} to unlock</figcaption>
    </figure>
  );
};

export default AvatarLocked;
