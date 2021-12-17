import { GET_GENDER_OPTIONS, GET_GENDER_OPTIONS_ERROR } from "../actions/types";

const initialState = {
  genders: [],
  genderOptions: [],
  gender: {},
  gendersError: {},
  genderOptionsError: {},
  updateStaus: false,
  addStatus: false,
  errorStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GENDER_OPTIONS:
      return {
        ...state,
        genderOptions: action.payload,
      };

    case GET_GENDER_OPTIONS_ERROR:
      return {
        ...state,
        genderOptionsError: action.payload,
      };

    default:
      return state;
  }
}
