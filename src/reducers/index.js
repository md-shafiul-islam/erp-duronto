import { combineReducers } from "redux";
import backLogReducer from "./backLogReducer";
import categoryReduucer from "./categoryReduucer";
import errorReducer from "./errorReducer";

export default combineReducers({
  errors: errorReducer,
  category: categoryReduucer,
  backlog: backLogReducer,
});
