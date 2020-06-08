import { GET_REST_PASS } from "../actions/types";

const initialState = {
  passRetData: {},
  passStatus: false,
};

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REST_PASS:
      return {
        ...state,
        passStatus: booleanActionPayload(action.payload),
        passRetData: action.payload,
      };
    default:
      return state;
  }
}
