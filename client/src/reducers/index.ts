import { combineReducers } from "redux";
import postReducer from "./posts";
import authReducer from "./auth";

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
