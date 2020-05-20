const initialState = {
  countries: [],
  country: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_CATEGORY:
      return {
        ...state,
        country: action.payload,
      };

    case DELET_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => country.countryIdentifier !== action.payload
        ),
      };
    default:
      return state;
  }
}
