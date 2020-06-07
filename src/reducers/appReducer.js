import { GET_ACCESSES, GET_ACCESS } from "../actions/types";

const initialState = {
  accesses: [],
  access: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACCESSES:
      return {
        ...state,
        accesses: action.payload,
      };

    case GET_ACCESS:
      return {
        ...state,
        access: action.payload,
      };

    default:
      return state;
  }
}
