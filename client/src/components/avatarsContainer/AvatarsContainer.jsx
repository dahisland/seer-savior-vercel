import React from "react";
import { useSelector } from "react-redux";
import { gameLevelsData } from "../../data/game/gameLevelsData";
import AvatarLocked from "./avatarLocked/AvatarLocked";
import AvatarUnlocked from "./avatarUnlocked/AvatarUnlocked";

const AvatarsContainer = ({ avatarsFiltered }) => {
  const { userConnected } = useSelector((state) => state.user);

  // Display an avatar for each existing game level (use gameLevelsData for that)
  // If user is not connected, or if user hasn't unlocked avatar yet, display the default avatar included
  // in gameLevelsData
  // Else, display avatar unlocked (collected by the API request)

  function currentAvatarUnlocked(lvl, avatarsFiltered) {
    const filterAvatarByLevel = avatarsFiltered.find(
      (item) => item.level === lvl
    );
    if (filterAvatarByLevel !== undefined) {
      return filterAvatarByLevel;
    } else {
      return null;
    }
  }

  return userConnected ? (
    <div className="avatars_container">
      <div className="avatars_list">
        {gameLevelsData.map((item, index) => (
          <div key={"avatar-connected-" + index} className="avatarsList_item">
            {avatarsFiltered &&
            currentAvatarUnlocked(item.level, avatarsFiltered) ? (
              <AvatarUnlocked
                currentAvatarUnlocked={currentAvatarUnlocked(
                  item.level,
                  avatarsFiltered
                )}
                itemGameData={item}
              />
            ) : (
              <AvatarLocked itemGameData={item} />
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="avatars_container">
      <p className="avatars_notConnected">
        Log in or create account and win levels to unlock new saviatars
      </p>
      <div className="avatars_list">
        {gameLevelsData.map((item, index) => (
          <div
            key={"avatar-not-connected-" + index}
            className="avatarsList_item"
          >
            <AvatarLocked itemGameData={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarsContainer;
