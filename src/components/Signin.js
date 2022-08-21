import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../helpers/user";
import Box from "./Box";

const inputFields = [
  { type: "email", name: "email", placeholder: "Email Id..." },
  { type: "password", name: "password", placeholder: "Password..." },
];

const Signin = () => {
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
    const usersInDB = getUserData();
    const inputEmail = data.get("email");
    const inputPass = data.get("password");
    const isUser = usersInDB.filter(
      (ele) => ele.email === inputEmail && ele.password === inputPass
    );
    if (isUser.length) {
      localStorage.setItem("lanUser", JSON.stringify(isUser[0]));
      navigate("/");
      window.location.reload();
    } else {
      console.log("User Not Found");
    }
  };
  return (
    <Box
      boxHeader="Signin"
      inputFields={inputFields}
      formType="signin-form"
      onSubmit={onSubmit}
    />
  );
};

export default Signin;
