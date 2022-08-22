import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../StateProvider";

function PrivateRoute(props) {
  const location = useLocation();
  const [loggedIn] = useContext(UserContext);
  if (loggedIn) {
    return props.children;
  }
  return <Navigate to="/signin" state={{ from: location }} />;
}

export default PrivateRoute;
