import Axios from "axios";
import {
  BASE_URL,
  GET_COUNTRIY,
  GET_COUNTRIES,
  REQUEST_HEADER,
  GET_ERRORS,
} from "./types";
import { Redirect } from "react-router-dom";

export const addCountry = (country, history) => async (dispatch) => {
  let url = `${BASE_URL}/countries/country`;
  await Axios.post(url, country, { headers: REQUEST_HEADER });
  history.push(`/countries`);
};

export const updateCountry = (country, history) => async (dispatch) => {
  let url = `${BASE_URL}/countries/country`;

  //console.log("Country Update Url: And Country ", url, country);

  await Axios.put(url, country, { headers: REQUEST_HEADER })
    .then((res) => {
      console.log("Update Country: ".res);
      if (res.data.status) {
        history.push(`/countries`);
      }
    })
    .catch((res) => {
      console.log("Error, country Redux, ", res);
    });
};

export const getCountries = () => async (dispatch) => {
  let url = `${BASE_URL}/countries`;

  console.log("Befor Post country Data: ");
  const res = await Axios.get(url, { headers: REQUEST_HEADER });
  dispatch({
    type: GET_COUNTRIES,
    payload: res.data,
  });
};

export const getCountry = (id, history) => async (dispatch) => {
  try {
    const res = await Axios.get(`${BASE_URL}/countries/country/${id}`, {
      headers: REQUEST_HEADER,
    });

    console.log(res.data);
    dispatch({
      type: GET_COUNTRIY,
      payload: res.data.country,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error Response not set"
          : "Error",
    });
  }
};
