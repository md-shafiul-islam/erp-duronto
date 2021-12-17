import {
  GET_DEPARTMENTS,
  GET_DEPARTMENTS_ERROR,
  GET_DEPARTMENT_OPTIONS,
  GET_DEPARTMENT_OPTIONS_ERROR,
} from "../actions/types";

const initialState = {
  departments: [],
  departmentOptions: [],
  department: {},
  departmentsError: {},
  departmentOptionsError: {},
  updateStaus: false,
  addStatus: false,
  errorStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };

    case GET_DEPARTMENTS_ERROR:
      return {
        ...state,
        departmentsError: action.payload,
      };
    case GET_DEPARTMENT_OPTIONS:
      return {
        ...state,
        departmentOptions: action.payload,
      };

    case GET_DEPARTMENT_OPTIONS_ERROR:
      return {
        ...state,
        departmentOptionsError: action.payload,
      };

    default:
      return state;
  }
}
