import React from "react";
import { Route } from "react-router-dom";
// Component Imports
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import About from "./Components/Home/About";
import SignUp from "./Components/Signup/SignUp";
import LogIn from "./Components/Signup/Login";
import Folders from "./Components/Folders/Folders";
import SessionsContainer from "./Components/Sessions/SessionsContainer";

function App() {
  return (
    <div className="App">
      <Route path="/" render={(props) => <NavBar {...props} />} />
      <Route exact path="/" render={(props) => <About {...props} />} />
      <Route path="/signup" render={(props) => <SignUp {...props} />} />
      <Route path="/signin" render={(props) => <LogIn {...props} />} />
      {/* left drawer paths */}
      <Route path="/home" render={(props) => <Home {...props} />} />
      <Route path="/folders" render={(props) => <Folders {...props} />} />
      <Route
        path="/session"
        render={(props) => <SessionsContainer {...props} />}
      />
    </div>
  );
}

export default App;
