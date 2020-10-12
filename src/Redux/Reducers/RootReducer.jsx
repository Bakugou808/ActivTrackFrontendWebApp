import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import authReducer from "./AuthReducer";
import folderReducer from "./FolderReducer";
import workoutReducer from "./WorkoutReducer";

const rootReducer = combineReducers({
  user: userReducer,
  authorized: authReducer,
  folders: folderReducer,
  workouts: workoutReducer,
});

export default rootReducer;
