import axios from "axios";
import { BASE_URL, GET_MARITAL_STATUS_OPTIONS, REQUEST_HEADER, GET_MARITAL_STATUS_OPTIONS_ERROR } from "./types";

export const getMaritalStatusOptionsAction = ()=> async (dispatch) => {
    const resp = await axios.get(`${BASE_URL}/marital-status/options`, { headers: REQUEST_HEADER });

    try {
        dispatch({
            type:GET_MARITAL_STATUS_OPTIONS,
            payload:resp.data,
        })
    } catch (error) {
        dispatch({
            type:GET_MARITAL_STATUS_OPTIONS_ERROR,
            payload:error,
        })
    }
  };