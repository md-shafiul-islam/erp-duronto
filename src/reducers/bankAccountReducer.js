import {
  ADD_BANK_ACCOUNT,
  ADD_BANK_ACCOUNT_ERROR,
  GET_BANK_ACCOUNT_OPTIONS,
  GET_BANK_ACCOUNT_OPTIONS_ERROR,
  GET_BANK_ACCOUNT_TYPES,
  SET_CONFRIMED_BANK_ACCOUNT,
} from "../actions/types";

const initialValues = {
  bankAccounts: [],
  addBankAccount: {},
  bankAccount: {},
  bankAccountTypes: [],
  bankAccountTypesOptions: [],
  bankAccountUpdateStatus: false,
  bankCAccounts: [],
};

const getBankAccounts = (resp, state) => {
  if (!resp.errStatus) {
    if (resp.status) {
      return resp.data;
    }
  }
  return state.bankCAccounts;
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
    case SET_CONFRIMED_BANK_ACCOUNT:
      return {
        ...state,
        bankCAccounts: getBankAccounts(action.payload, state),
      };
    default:
      return state;
  }
}
