import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../helpers/user";
import Box from "../components/Box";
import UserContext from "../StateProvider";
import { toast } from "react-toastify";

const inputFields = [
  { type: "email", name: "email", placeholder: "Email Id..." },
  { type: "password", name: "password", placeholder: "Password..." },
];

const Signin = () => {
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
    const usersInDB = getUserData();
    const inputEmail = data.get("email");
    const inputPass = data.get("password");
    const isUser = usersInDB.filter(
      (ele) => ele.email === inputEmail && ele.password === inputPass
    );
    if (isUser.length) {
      localStorage.setItem("lanUser", JSON.stringify(isUser[0]));
      toast.success("Successfully Logged In!!");
      navigate("/profile");
      setLoggedIn(true);
    } else {
      toast.error("Login Failed!! Please check username and password.");
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
