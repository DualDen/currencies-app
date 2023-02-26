import React from "react";
import { Link, useMatch } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const params = useMatch("");
  const linkCheck = () => {
    if (params?.pathname === "/") {
      return (
        <Link className="header-link" to="/currencies">
          To Currency List
        </Link>
      );
    } else {
      return (
        <Link className="header-link" to="/">
          To Converter
        </Link>
      );
    }
  };
  return <div className="header">{linkCheck()}</div>;
};

export default Header;
