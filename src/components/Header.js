import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="header-logo">Logo</div>
      <ul className="header-list">
        {/* <li>Logo</li> */}
        <li>Home</li>
        <li>Profile</li>
        <li>Add Post</li>
        <li>Login</li>
      </ul>
    </div>
  );
}

export default Header;
