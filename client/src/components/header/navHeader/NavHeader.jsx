import React from "react";
import { navItemsData } from "../../../data/headerData";
import { NavLink } from "react-router-dom";

const NavHeader = ({ navClass, linkClass, linkClassActive }) => {
  return (
    <nav className={navClass}>
      <ul>
        {navItemsData
          .sort((a, b) => a.position - b.position)
          .map((item, index) => (
            <li key={navClass + index}>
              <NavLink
                to={item.navlink}
                className={({ isActive }) =>
                  isActive ? linkClassActive : linkClass
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default NavHeader;
