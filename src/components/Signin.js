import React from "react";
import Box from "./Box";

const inputFields = [
  { type: "email", name: "email", placeholder: "Email Id..." },
  { type: "password", name: "password", placeholder: "Password..." },
];
const Signin = () => {
  return (
    <Box boxHeader="Signin" inputFields={inputFields} formType="signin-form" />
  );
};

export default Signin;
