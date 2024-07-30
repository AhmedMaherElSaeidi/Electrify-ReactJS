import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavDropdown = ({ children, class_name, list }) => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const toggleVisibility = () => {
    setDropdownVisibility(!dropdownVisibility);
  };

  return (
    <>
      <span
        className={`nav-link dropdown-toggle ${class_name}`}
        onClick={toggleVisibility}
      >
        {children}
      </span>
      {dropdownVisibility && (
        <ul className="dropdown-menu show" onMouseLeave={toggleVisibility}>
          {list.map((value, index) => (
            <li key={index}>
              <Link className="dropdown-item" to={value.to}>
                {value.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NavDropdown;
