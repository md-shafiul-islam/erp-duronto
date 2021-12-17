import axios from "axios";
import { BASE_URL, GET_ROLE_OPTIONS, GET_ROLE_OPTIONS_ERROR, REQUEST_HEADER } from "./types";

export const getRoleOptionsAction = () => async (dispatch) => {
  const resp = await axios.get(`${BASE_URL}/roles/options`, {
    headers: REQUEST_HEADER,
  });

  console.log("Action Role Options, ", resp);

  try {
    dispatch({
      payload: resp.data,
      type: GET_ROLE_OPTIONS,
    });
  } catch (error) {
    dispatch({
      type: GET_ROLE_OPTIONS_ERROR,
      payload: error,
    });
  }
};
