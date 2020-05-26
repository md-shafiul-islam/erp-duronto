import { GET_COUNTRIES, GET_COUNTRIY, DELET_COUNTRIY } from "../actions/types";

const initialState = {
  countries: [],
  country: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_COUNTRIY:
      return {
        ...state,
        country: action.payload,
      };

    case DELET_COUNTRIY:
      return {
        ...state,
        countries: state.countries.filter(
          (country) => country.countryIdentifier !== action.payload
        ),
      };
    default:
      return state;
  }
}
