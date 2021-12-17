import {
  GET_ROLE_OPTIONS,
  GET_ROLE_OPTIONS_ERROR,
} from "../actions/types";

const initialState = {
  roles: [],
  roleOptions: [],
  role: {},
  rolesError: {},
  roleOptionsError: {},
  updateStaus: false,
  addStatus: false,
  errorStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROLE_OPTIONS:
      return {
        ...state,
        roleOptions: action.payload,
      };

    case GET_ROLE_OPTIONS_ERROR:
      return {
        ...state,
        roleOptionsError: action.payload,
      };

    default:
      return state;
  }
}
