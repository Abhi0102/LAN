import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(localStorage.getItem("lanUser"));
  console.log(user);
  const handleSignout = () => {
    localStorage.removeItem("lanUser");
    window.location.reload();
  };
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
        {user ? (
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
