import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import authReducer from "./AuthReducer";
import folderReducer from "./FolderReducer";
import workoutReducer from "./WorkoutReducer";
import circuitReducer from "./CircuitsReducer";
import exerciseReducer from "./ExerciseReducer";

const rootReducer = combineReducers({
  user: userReducer,
  authorized: authReducer,
  folders: folderReducer,
  workouts: workoutReducer,
  circuits: circuitReducer,
  exercises: exerciseReducer,
});

export default rootReducer;
