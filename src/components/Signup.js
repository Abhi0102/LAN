import React from "react";
import Box from "./Box";

const inputFields = [
  { type: "text", name: "name", placeholder: "Name..." },
  { type: "email", name: "email", placeholder: "Email Id..." },
  { type: "password", name: "password", placeholder: "Password..." },
];

function Signup() {
  return (
    <Box boxHeader="Signup" inputFields={inputFields} formType="signup-form" />
  );
}

export default Signup;
