import {
  GET_PACK_CATEGORIES,
  GET_PACK_CATEGORY,
  PACK_CAT_DELETE,
} from "../actions/types";

const initialState = {
  packCategories: [],
  packCategory: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PACK_CATEGORIES:
      return {
        ...state,
        packCategories: action.payload,
      };

    case GET_PACK_CATEGORY:
      return {
        ...state,
        packCategory: action.payload,
      };

    case PACK_CAT_DELETE:
      return {
        ...state,
        packCategories: state.packCategories.filter(
          (category) => category.categoryIdentifier !== action.payload
        ),
      };
    default:
      return state;
  }
}
