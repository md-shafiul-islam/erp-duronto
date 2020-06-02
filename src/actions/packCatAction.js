import Axios from "axios";
import {
  BASE_URL,
  REQUEST_HEADER,
  GET_PACK_CATEGORIES,
  GET_PACK_CATEGORY,
  GET_ERRORS,
} from "./types";

export const addPackCategoryAction = (category, history) => async (
  dispatch
) => {
  let url = `${BASE_URL}/package-categories/package-category`;

  await Axios.post(url, category, { headers: REQUEST_HEADER })
    .then((res) => {
      console.log("Success : ", res);
    })
    .catch((res) => {
      console.log("Error, Package Category Redux, ", res);
    });
  history.push(`/package-categories`);
};

export const getPackageCategories = () => async (dispatch) => {
  try {
    let url = `${BASE_URL}/package-categories`;
    console.log("Pack Cats Run ");
    const res = await Axios.get(url, { headers: REQUEST_HEADER });

    dispatch({
      type: GET_PACK_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.data !== undefined
            ? err.data
            : "Error Data Not Define"
          : "Error Not Define!!",
    });
  }
};

export const getPackageCategory = (id, history) => async (dispatch) => {
  const res = await Axios.get(`${BASE_URL}/categories/category/${id}`);

  dispatch({
    type: GET_PACK_CATEGORY,
    payload: res.data,
  });
};

export const updatePackCategoryAction = (category, history) => async (
  dispatch
) => {
  let url = `${BASE_URL}/package-categories/package-category`;

  await Axios.put(url, category, { headers: REQUEST_HEADER })
    .then((res) => {
      console.log("Success : ", res);
    })
    .catch((res) => {
      console.log("Error, Package Category Redux, Update", res);
    });
  history.push(`/package-categories`);
};
