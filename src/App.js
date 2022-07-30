import "./App.css";
import Header from "./components/Header";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Header />
      <Signup />
      <Signin />
    </div>
  );
}

export default App;
