import {
    GET_MARITAL_STATUS_OPTIONS,
    GET_MARITAL_STATUS_OPTIONS_ERROR,
  } from "../actions/types";
  
  const initialState = {
    maritalStatuses: [],
    maritalStatusOptions: [],
    maritalStatus: {},
    maritalStatusesError: {},
    maritalStatusOptionsError: {},
    updateStaus: false,
    addStatus: false,
    errorStatus: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_MARITAL_STATUS_OPTIONS:
        return {
          ...state,
          maritalStatusOptions: action.payload,
        };
  
      case GET_MARITAL_STATUS_OPTIONS_ERROR:
        return {
          ...state,
          maritalStatusOptionsError: action.payload,
        };
  
      default:
        return state;
    }
  }
  