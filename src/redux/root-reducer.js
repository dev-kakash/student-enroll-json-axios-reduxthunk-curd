import { combineReducers } from "redux";
import peopleReducer from "./reducer";

const rootReducer = combineReducers({
  data: peopleReducer,
});

export default rootReducer;
