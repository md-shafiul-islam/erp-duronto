import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
};

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function (state = initialState, action) {
  console.log("Security Reducer: State Action", state, action);
  console.log("Current Payload: action.payload, actions.valid", action.payload);
  console.log("SET_CURRENT_USER Case: ", action.type);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
