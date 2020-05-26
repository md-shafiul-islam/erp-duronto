import Axios from "axios";
import {
  BASE_URL,
  REQUEST_HEADER,
  GET_CATEGORIES,
  GET_CATEGORY,
} from "./types";

export const addCategoryAction = (category, history) => async (dispatch) => {
  let url = `${BASE_URL}/categories/category`;

  console.log("Befor Post Category Data: ", category);
  await Axios.post(url, category, { headers: REQUEST_HEADER })
    .then((res) => {
      console.log("Success : ", res);
    })
    .catch((res) => {
      console.log("Error, Category Redux, ", res);
    });
  history.push(`/categories`);
};

export const getCategories = () => async (dispatch) => {
  let url = `${BASE_URL}/categories`;

  console.log("Befor Post Category Data: ");
  const res = await Axios.get(url, { headers: REQUEST_HEADER });
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data,
  });
};

export const getCategory = (id, history) => async (dispatch) => {
  const res = await Axios.get(`${BASE_URL}/categories/category/${id}`);

  dispatch({
    type: GET_CATEGORY,
    payload: res.data,
  });
};
