import Axios from "axios";
import { BASE_URL } from "./types";

export const addCountry = (category, history) => async (dispatch) => {
  let url = `${BASE_URL}/categories/category`;
  await Axios.post(url, category);
  history.push(`/categories`);
};
