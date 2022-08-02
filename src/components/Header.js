import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">Logo</Link>
      </div>
      <ul className="header-list">
        {/* <li>Logo</li> */}
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/signin">
          <li>SignIn</li>
        </Link>
        <Link to="/signup">
          <li>SignUp</li>
        </Link>
      </ul>
    </div>
  );
}

export default Header;
