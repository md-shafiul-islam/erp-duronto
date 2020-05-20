import Axios from "axios";
import { BASE_URL } from "./types";

export const addCountry = (country, history) => async (dispatch) => {
  let url = `${BASE_URL}/counties/country`;
  await Axios.post(url, country);
  history.push(`/countries`);
};
