import { combineReducers } from "redux";
import categoryReduucer from "./categoryReduucer";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import appReducer from "./appReducer";
import tokenReducer from "./tokenReducer";
import packCatReducer from "./packCatReducer";
import designationReducer from "./designationReducer";
import genderReducer from "./genderReducer";
import roleReducer from "./roleReducer";
import maritalStatusReducer from "./maritalStatusReducer";
import departmetReducer from "./departmetReducer";
import countryReduucer from "./countryReduucer";
import bankReducer from "./bankReducer";
import bankAccountReducer from "./bankAccountReducer";
import rechargeReducer from "./rechargeReducer";

export default combineReducers({
  errors: errorReducer,
  category: categoryReduucer,
  country: countryReduucer,
  security: securityReducer,
  appStore: appReducer,
  tokenData: tokenReducer,
  packCats: packCatReducer,
  designation: designationReducer,
  bank: bankReducer,
  gender:genderReducer,
  role:roleReducer,
  maritalStatus:maritalStatusReducer,
  department:departmetReducer,
  bankAccount:bankAccountReducer,
  recharge:rechargeReducer,
});
