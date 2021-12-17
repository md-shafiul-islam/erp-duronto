import {
  ADD_BANK_ACCOUNT,
  ADD_BANK_ACCOUNT_ERROR,
  GET_BANK_ACCOUNT_OPTIONS,
  GET_BANK_ACCOUNT_OPTIONS_ERROR,
  GET_BANK_ACCOUNT_TYPES,
  GET_BANK_ERROR,
  GET_BANK_OPTIONS,
  GET_BANK_UPDATE,
  SET_COUNTRIY_OPTION,
  SET_COUNTRIY_OPTION_ERROR,
} from "../actions/types";

const initialValues = {
  bankError: {},
  countryOptions: [],
  countryOptionsError: {},
  bankOptions: [],
};

export default function (state = initialValues, action) {
  console.log("Bank Action Reducer :) ", action.payload);
  switch (action.type) {
    
    case SET_COUNTRIY_OPTION:
      return {
        ...state,
        countryOptions: action.payload,
      };

    case SET_COUNTRIY_OPTION_ERROR:
      return {
        ...state,
        countryOptionsError: action.payload,
      };
    case GET_BANK_UPDATE:
      return {
        ...state,
        bankAccountUpdateStatus: action.payload,
      };
    case GET_BANK_ERROR:
      return {
        ...state,
        bankError: action.payload,
      };
    case GET_BANK_OPTIONS:
      return {
        ...state,
        bankOptions: action.payload ? action.payload : [],
      };
    default:
      return state;
  }
}
