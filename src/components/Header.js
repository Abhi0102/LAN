import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../StateProvider";

// Navbar
function Header() {
  const [loggedIn, setLoggedIn] = useContext(UserContext);
  const handleSignout = () => {
    localStorage.removeItem("lanUser");
    setLoggedIn(false);
  };
  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">LAN App</Link>
      </div>
      <ul className="header-list">
        {/* <li>Logo</li> */}
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/posts">
          <li>Posts</li>
        </Link>
        {loggedIn ? (
          <>
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/" onClick={handleSignout}>
              <li>Signout</li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">
              <li>SignIn</li>
            </Link>
            <Link to="/signup">
              <li>SignUp</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
