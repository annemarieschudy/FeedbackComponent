import { combineReducers } from "redux";
import rateReducer from "./rateReducer";
import dashboardReducer from "./dashboardReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  rate: rateReducer,
  dashboard: dashboardReducer,
  errors: errorReducer
});
