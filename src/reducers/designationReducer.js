import {
  GET_DESIGNATIONS,
  GET_DESIGNATION,
  GET_DESIGNATION_OPTIONS,
  GET_DESIGNATION_OPTIONS_ERROR,
} from "../actions/types";

const initialState = {
  designations: [],
  designation: {},
  designationOptions: [],
  designationOptionsError: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DESIGNATIONS:
      return {
        ...state,
        designations: action.payload,
      };

    case GET_DESIGNATION:
      return {
        ...state,
        designation: action.payload,
      };

    case GET_DESIGNATION_OPTIONS:
      return {
        ...state,
        designationOptions: action.payload,
      };

    case GET_DESIGNATION_OPTIONS_ERROR:
      return {
        ...state,
        designationOptionsError: action.payload,
      };

    default:
      return state;
  }
}
