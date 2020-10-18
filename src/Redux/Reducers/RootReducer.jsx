import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import authReducer from "./AuthReducer";
import folderReducer from "./FolderReducer";
import workoutReducer from "./WorkoutReducer";
import circuitReducer from "./CircuitsReducer";
import exerciseReducer from "./ExerciseReducer";
import circExReducer from "./CircExReducer";
import workCircuitReducer from "./WorkCircuitReducer";
import statReducer from "./StatReducer";
import sessionReducer from "./SessionReducer";

const rootReducer = combineReducers({
  user: userReducer,
  authorized: authReducer,
  folders: folderReducer,
  workouts: workoutReducer,
  exercises: exerciseReducer,
  circuits: circuitReducer,
  circExs: circExReducer,
  workCircuits: workCircuitReducer,
  sessions: sessionReducer,
  stats: statReducer,
});

export default rootReducer;
