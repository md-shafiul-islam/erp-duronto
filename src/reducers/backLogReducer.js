import { GET_COUNTRIES, GET_COUNTRIY } from "../actions/types";

const initialState = {
  countres: [],
  country: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countres: action.payload,
      };

    case GET_COUNTRIY:
      return {
        ...state,
        country: action.payload,
      };

    default:
      return state;
  }
}
