import {
  GET_COUNTRIES,
  GET_COUNTRIY,
  DELET_COUNTRIY,
  GET_COUNTRY_OPTIONS,
  GET_COUNTRY_OPTIONS_ERROR,
} from "../actions/types";

const initialState = {
  countries: [],
  country: {},
  countryOptions: [],
  countryOptionsError: {},
};

export default function (state = initialState, action) {
  console.log("SW GET Country Options, ", action.payload);
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

    case GET_COUNTRY_OPTIONS:
      return {
        ...state,
        countryOptions: action.payload,
      };

    case GET_COUNTRY_OPTIONS_ERROR:
      return {
        ...state,
        countryOptionsError: action.payload,
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
