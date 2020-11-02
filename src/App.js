import React from "react";
import { Route, Switch } from "react-router-dom";
// Component Imports
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import About from "./Components/Home/About";
import SignUp from "./Components/Signup/SignUp";
import LogIn from "./Components/Signup/Login";
import Folders from "./Components/Folders/Folders";
import Folder from "./Components/Folders/Folder";
import SessionsContainer from "./Components/Sessions/SessionsContainer";
import NewWorkout from "./Components/Workouts/NewWorkout";
import Workout from "./Components/Workouts/Workout";
import StartWorkout from "./Components/Workouts/StartWorkout";
import EndWorkout from "./Components/Workouts/EndWorkout";
import AllStatsContainer from "./Components/Stats/AllStatsContainer";
import StatsPage from "./Components/Stats/StatsPage";

class App extends React.Component {
  render() {
    return (
      <div className="App overflowYHidden">
        <Route path="/" render={(props) => <NavBar {...props} />} />
        <Switch>
          <Route path="/about" render={(props) => <About {...props} />} />
          <Route path="/signup" render={(props) => <SignUp {...props} />} />
          <Route path="/signin" render={(props) => <LogIn {...props} />} />
          {/* left drawer paths */}
          <Route path="/home" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/folders"
            render={(props) => <Folders {...props} />}
          />
          {/* custom paths with ids */}
          <Route
            path="/statsPage"
            render={(props) => <StatsPage {...props} />}
          />
          <Route
            path="/displayStats/:workoutTitle/:workoutId"
            render={(props) => <AllStatsContainer {...props} />}
          />
          <Route
            path={`/folders/:folderName/:folderId`}
            render={(props) => <Folder {...props} />}
          />
          <Route
            path="/new_workout/:folderName/:folderId/:workoutTitle/:workoutId"
            render={(props) => <NewWorkout {...props} />}
          />
          <Route
            path="/workouts/:folderName/:folderId/:workoutTitle/:workoutId"
            render={(props) => <Workout {...props} />}
          />
          <Route
            path="/start_workouts/:folderName/:folderId/:workoutTitle/:workoutId/:sessionId"
            render={(props) => <StartWorkout {...props} />}
          />
          <Route
            path="/workout_finished/:folderName/:folderId/:workoutTitle/:workoutId/:sessionId"
            render={(props) => <EndWorkout {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
