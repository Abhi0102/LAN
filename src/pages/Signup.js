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
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(UserContext);
  const from = location.state?.from?.pathname || "/";
  // const isLoggedIn = localStorage.getItem("lanUser") ? true : false;

  useEffect(() => {
    if (loggedIn) {
      navigate(from, { replace: true });
    }
  }, [loggedIn]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const pwd = data.get("password");
    const name = data.get("name");
    const users = getUserData();
    const alreadyExist = users.filter((ele) => ele.email === email);
    if (alreadyExist.length) {
      alert("Email Already Exists");
    } else {
      const user = setUserData(name, email, pwd);
      localStorage.setItem("lanUser", JSON.stringify(user));
      navigate("/");
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
