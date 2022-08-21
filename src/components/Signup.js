import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData, setUserData } from "../helpers/user";
import Box from "./Box";

const inputFields = [
  { type: "text", name: "name", placeholder: "Name..." },
  { type: "email", name: "email", placeholder: "Email Id..." },
  { type: "password", name: "password", placeholder: "Password..." },
];

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const isLoggedIn = localStorage.getItem("lanUser") ? true : false;

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn]);

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
      window.location.reload();
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
