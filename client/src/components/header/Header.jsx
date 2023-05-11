import React, { useState } from "react";
import NavBurgerIcon from "./navBurgerIcon/NavBurgerIcon";
import LogoHeader from "./logoHeader/LogoHeader";
import ProfileHeader from "./profileHeader/ProfileHeader";
import NavHeader from "./navHeader/NavHeader";

const Header = ({ setModaleDisplay }) => {
  const [navIsOpened, setNavIsOpened] = useState(false);

  return (
    <div className="header_container">
      <NavBurgerIcon
        navIsOpened={navIsOpened}
        setNavIsOpened={setNavIsOpened}
      />

      <LogoHeader />

      <div className="header_title">
        <h1>Seer Savior</h1>
      </div>

      <ProfileHeader setModaleDisplay={setModaleDisplay} />

      <div className="header_navDesktop">
        <NavHeader
          navClass={"navDesktop_item"}
          linkClass={"navDesktopItem_link"}
          linkClassActive={"navDesktopItem_link--active"}
        />
      </div>

      <div className="header_navMobile">
        <div
          className={
            navIsOpened ? "navMobile_content" : "navMobile_content--hidden"
          }
        >
          <NavHeader
            navClass={"navMobile_item"}
            linkClass={"navMobileItem_link"}
            linkClassActive={"navMobileItem_link--active"}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
