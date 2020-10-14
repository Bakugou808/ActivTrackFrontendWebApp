import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import authReducer from "./AuthReducer";
import folderReducer from "./FolderReducer";
import workoutReducer from "./WorkoutReducer";
import circuitReducer from "./CircuitsReducer";
import exerciseReducer from "./ExerciseReducer";
import circExReducer from "./CircExReducer";
import workCircuitReducer from "./WorkCircuitReducer";

const rootReducer = combineReducers({
  user: userReducer,
  authorized: authReducer,
  folders: folderReducer,
  workouts: workoutReducer,
  circuits: circuitReducer,
  exercises: exerciseReducer,
  circExs: circExReducer,
  workCircuits: workCircuitReducer,
});

export default rootReducer;
