import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgCloseO } from "react-icons/cg";

const NavBurgerIcon = ({ navIsOpened, setNavIsOpened }) => {
  return (
    <div className="header_iconNav">
      {navIsOpened ? (
        <CgCloseO
          className={"iconNav--close"}
          onClick={() => setNavIsOpened(false)}
        />
      ) : (
        <GiHamburgerMenu
          className={"iconNav--burger"}
          onClick={() => setNavIsOpened(true)}
        />
      )}
    </div>
  );
};

export default NavBurgerIcon;
