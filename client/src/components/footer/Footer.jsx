import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer_copyrights">
        <p>Copyrights </p>
        <NavLink
          to="https://dahisland.github.io/dahisland-development"
          target="_blank"
          rel="noreferrer"
        >
          ©dahisland2023
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
