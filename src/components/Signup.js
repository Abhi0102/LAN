import React from "react";

function Signup() {
  return (
    <div className="box">
      <div className="box-header">Signup</div>
      <form className="signup-form">
        <label>
          {/* Name: */}
          <input type="text" name="name" placeholder="Name..." />
        </label>
        <label>
          {/* Email: */}
          <input type="email" name="email" placeholder="Email..." />
        </label>
        <label>
          {/* Password: */}
          <input type="password" name="password" placeholder="Password..." />
        </label>
        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </div>
  );
}

export default Signup;
