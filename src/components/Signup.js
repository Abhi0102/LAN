import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    
  };
  return (
    <Box boxHeader="Signup" inputFields={inputFields} formType="signup-form" />
  );
}

export default Signup;
