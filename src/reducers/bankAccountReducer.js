import {
  ADD_BANK_ACCOUNT,
  ADD_BANK_ACCOUNT_ERROR,
  GET_BANK_ACCOUNT_OPTIONS,
  GET_BANK_ACCOUNT_OPTIONS_ERROR,
  GET_BANK_ACCOUNT_TYPES,
  GET_BANK_ACCOUNT_UPDATE_APPRROVE,
  GET_BANK_ERROR,
  GET_BANK_UPDATE,
  SET_BANK_CHANGE_STATUS,
  SET_COUNTRIY_OPTION,
  SET_COUNTRIY_OPTION_ERROR,
} from "../actions/types";

const initialValues = {
  bankAccounts: [],
  addBankAccount: {},
  bankAccount: {},
  bankError: {},
  bankAccountTypes: [],
  bnkAcOpError: {},
  bankAccountTypesOptions: [],
  countryOptions: [],
  countryOptionsError: {},
  bankAccountUpdateStatus: false,
  bankAccountUpdateApproveStatus: false,
};

export default function (state = initialValues, action) {
  console.log("Bank Action Reducer :) ", action.payload);
  switch (action.type) {
    case ADD_BANK_ACCOUNT:
      return {
        ...state,
        addBankAccount: action.payload,
      };

    case ADD_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        bankError: action.payload,
      };

    case GET_BANK_ACCOUNT_TYPES:
      return {
        ...state,
        bankAccountTypes: action.payload,
      };
    case GET_BANK_ACCOUNT_OPTIONS:
      return {
        ...state,
        bankAccountTypesOptions: action.payload,
      };
    case GET_BANK_ACCOUNT_OPTIONS_ERROR:
      return {
        ...state,
        bnkAcOpError: action.payload,
      };
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
    case GET_BANK_ACCOUNT_UPDATE_APPRROVE:
      return {
        ...state,
        bankAccountUpdateApproveStatus: action.payload,
      };
      case SET_BANK_CHANGE_STATUS:
        return {
          ...state,
          bankAccountUpdateApproveStatus: action.payload,
        };  
    default:
      return state;
  }
}
