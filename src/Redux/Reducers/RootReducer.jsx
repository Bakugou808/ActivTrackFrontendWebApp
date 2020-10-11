import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import authReducer from "./AuthReducer";
import folderReducer from "./FolderReducer";

const rootReducer = combineReducers({
  user: userReducer,
  authorized: authReducer,
  folders: folderReducer,
});

export default rootReducer;
