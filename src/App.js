import "./App.css";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import PrivateRoute from "./helpers/PrivateRoute";
import Home from "./pages/Home";
import { UserProvider } from "./StateProvider";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("lanUser");
    if (user) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <UserProvider value={[loggedIn, setLoggedIn]}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
