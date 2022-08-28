import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../StateProvider";

// Private Route is used to prevent unautorized access to the user if he is not logged in.
function PrivateRoute(props) {
  const location = useLocation();
  const [loggedIn] = useContext(UserContext);
  if (loggedIn) {
    return props.children;
  }
  return <Navigate to="/signin" state={{ from: location }} />;
}

export default PrivateRoute;
