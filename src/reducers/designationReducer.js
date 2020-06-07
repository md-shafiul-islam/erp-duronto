import { GET_DESIGNATIONS, GET_DESIGNATION } from "../actions/types";

const initialState = {
  designations: [],
  designation: {},
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

    default:
      return state;
  }
}
