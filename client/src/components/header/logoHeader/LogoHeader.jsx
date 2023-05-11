import React from "react";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";

const LogoHeader = () => {
  return (
    <div className="header_logo">
      <NavLink to="/" end>
        <picture>
          <img src={logo} alt="logo seer savior" />
        </picture>
      </NavLink>
    </div>
  );
};

export default LogoHeader;
