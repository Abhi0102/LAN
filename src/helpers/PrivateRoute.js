import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute(props) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("lanUser") ? true : false;
  //   console.log(isLoggedIn);
  if (isLoggedIn) {
    console.log("Success");
    return props.children;
  }
  return <Navigate to="/signin" state={{ from: location }} />;
}

export default PrivateRoute;
