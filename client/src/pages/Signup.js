import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData, setUserData } from "../helpers/user";
import Box from "../components/Box";
import UserContext from "../StateProvider";

const inputFields = [
  { type: "text", name: "name", placeholder: "Name..." },
  { type: "email", name: "email", placeholder: "Email Id..." },
  { type: "password", name: "password", placeholder: "Password..." },
];

function Signup() {
  // Refer to signin page
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(UserContext);
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (loggedIn) {
      navigate(from, { replace: true });
    }
  }, [loggedIn]);

  // On Signup - Check if username already exists, check password is strong enough, save user data and
  // logged in user by saving user detail in local storage.
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const pwd = data.get("password");
    const name = data.get("name");
    const users = getUserData();
    const alreadyExist = users.filter((ele) => ele.email === email);
    const strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    console.log(strongPassword.test(pwd));
    if (alreadyExist.length) {
      alert("Email Already Exists");
    } else if (!strongPassword.test(pwd)) {
      alert(
        "Password is not strong enough. It should have atleast 1 Upper case, 1 Lower case and 1 special character and it should be atleast 8 char long."
      );
    } else {
      const user = setUserData(name, email, pwd);
      localStorage.setItem("lanUser", JSON.stringify(user));
      navigate("/profile");
      setLoggedIn(true);
    }
  };
  return (
    <Box
      boxHeader="Signup"
      inputFields={inputFields}
      formType="signup-form"
      onSubmit={onSubmit}
    />
  );
}

export default Signup;
