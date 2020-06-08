import Axios from "axios";
import { BASE_URL, REQUEST_HEADER, GET_ERRORS, GET_REST_PASS } from "./types";

export const restPasswordAction = (passSet) => async (dispatch) => {
  try {
    let url = `${BASE_URL}/users/user/rest-pass`;
    const res = await Axios.put(url, passSet, { headers: REQUEST_HEADER });

    dispatch({
      type: GET_REST_PASS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Please Check you Connection "
          : "User Password Set Error, Please Check you Connection",
    });
  }
};
