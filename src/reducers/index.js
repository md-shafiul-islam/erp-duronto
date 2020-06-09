import { combineReducers } from "redux";
import backLogReducer from "./backLogReducer";
import categoryReduucer from "./categoryReduucer";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import appReducer from "./appReducer";
import tokenReducer from "./tokenReducer";
import packCatReducer from "./packCatReducer";
import designationReducer from "./designationReducer";

export default combineReducers({
  errors: errorReducer,
  category: categoryReduucer,
  backlog: backLogReducer,
  security: securityReducer,
  appStore: appReducer,
  tokenData: tokenReducer,
  packCats: packCatReducer,
  designation: designationReducer,
});
