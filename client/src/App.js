import "./App.css";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import PrivateRoute from "./helpers/PrivateRoute";
import Posts from "./pages/Posts";
import { UserProvider } from "./StateProvider";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import axios from "axios";

function App() {
  // Logged In flag used to know if the user is logged in or not. Default - false.
  const [loggedIn, setLoggedIn] = useState(false);

  // If user details found in local storage then set loggedIn flag to true.
  useEffect(() => {
    axios
      .get("/api/v1/user/get-user")
      .then((response) => {
        localStorage.setItem("lanUser", JSON.stringify(response.data.user));
        setLoggedIn(true);
      })
      .catch((error) => {
        localStorage.removeItem("lanUser");
        setLoggedIn(false);
      });
  }, []);
  return (
    <BrowserRouter>
      {/* Providing the loggedIn flag to the context api so that it could be used in app and render components accordingly */}
      <UserProvider value={[loggedIn, setLoggedIn]}>
        <div className="App">
          <Header />
          {/* Toastify is used to provide visual cue during signup,signin etc. process. */}
          <ToastContainer />

          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            {/* // Private Route is an HOC which protects the user to visit restricted page(profile) if the user is not signed in*/}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/posts" element={<Posts />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
