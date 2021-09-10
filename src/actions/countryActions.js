import Axios from "axios";
import {
  BASE_URL,
  GET_COUNTRIY,
  GET_COUNTRIES,
  REQUEST_HEADER,
  GET_ERRORS,
  SET_COUNTRIY_OPTION,
  SET_COUNTRIY_OPTION_ERROR,
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
  try {
    dispatch({
      type: GET_COUNTRIES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: {msg:"Countries Not Found", status:false},
    });
  }
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

export const getCountryOptions = async (callBack) => {
  console.log("Countries Options Action ....");
  const res = await Axios.get(`${BASE_URL}/countries/options`, {
    headers: REQUEST_HEADER,
  });
  console.log("Countries Options Action Response Data, ", res);
  if (res) {
    if (res.data) {
      if (res.data.status) {
        callBack(res.data.data);
      }
    }
  }
};

const haveCountryOptions = (data) => {
  if (data) {
    console.log("Before Send Via Redux Country Options ", data.data);
    return data.status;
  }
};

export const getCountryOptionsViaRedux = ()=> async (dispatch) => {
  const resp = await Axios.get(`${BASE_URL}/countries/options`, {
    headers: REQUEST_HEADER,
  });
  try {
    
    dispatch({
      type: SET_COUNTRIY_OPTION,
      payload: haveCountryOptions(resp.data) ? resp.data.data : [],
    });
  } catch (error) {
    dispatch({
      type: SET_COUNTRIY_OPTION_ERROR,
      payload: error,
    });
  }
};
