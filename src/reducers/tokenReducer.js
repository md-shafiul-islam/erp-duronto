import { SET_TOKEN } from "../actions/types";

const initialState = {
  token: "",
};

export default function (state = initialState, action) {
  console.log("Token Reducer Run!!");
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
