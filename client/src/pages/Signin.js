import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../helpers/user";
import Box from "../components/Box";
import UserContext from "../StateProvider";
import { toast } from "react-toastify";
import axios from "axios";

const inputFields = [
  { type: "email", name: "email", placeholder: "Email Id..." },
  { type: "password", name: "password", placeholder: "Password..." },
];

const Signin = () => {
  // Location and navigate is used to identify from where the user is accessing the signin page.
  // Suppose user is trying to access /profile but he is not logged in.
  // Then he will be redirected to signin page and the /profile location is saved in from.
  // Once he is successfully verified as logged in he will be redirected back to from i.e. /profile.
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(UserContext);
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (loggedIn) {
      // replace : true to remove signin page from history
      navigate(from, { replace: true });
    }
  }, [loggedIn]);

  // Login Checks - Compare user name and password if found then show visual cue and logged in user to the app by saving the detail in local storage.
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const usersInDB = getUserData();
    const inputEmail = data.get("email");
    const inputPass = data.get("password");
    axios
      .post("/api/v1/user/login", {
        email: inputEmail,
        password: inputPass,
      })
      .then((response) => {
        // console.log(response.data);
        localStorage.setItem("lanUser", JSON.stringify(response.data.user));
        navigate("/profile");
        setLoggedIn(true);
        toast.success(`Welcome ${response.data.user.name}`);
      })
      .catch((error) => toast.error(error.response.data.error));
    // const isUser = usersInDB.filter(
    //   (ele) => ele.email === inputEmail && ele.password === inputPass
    // );
    // if (isUser.length) {
    //   localStorage.setItem("lanUser", JSON.stringify(isUser[0]));
    //   toast.success("Successfully Logged In!!");
    //   navigate("/profile");
    //   setLoggedIn(true);
    // } else {
    //   toast.error("Login Failed!! Please check username and password.");
    // }
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
