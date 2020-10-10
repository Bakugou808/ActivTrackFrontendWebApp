import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import authReducer from "./AuthReducer";

const rootReducer = combineReducers({
  user: userReducer,
  authorized: authReducer,
});

export default rootReducer;
