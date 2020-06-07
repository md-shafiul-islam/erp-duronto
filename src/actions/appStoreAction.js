import {
  GET_ACCESSES,
  BASE_URL,
  REQUEST_HEADER_GET,
  GET_ERRORS,
  REQUEST_HEADER,
} from "./types";
import Axios from "axios";

export const getAccess = (userId, tokenData) => async (dispatch) => {
  try {
    let url = `${BASE_URL}/users/user/access/${userId}`;

    console.log("App store Token ", tokenData);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
      Authorization:
        localStorage.jwtToken !== undefined ? localStorage.jwtToken : tokenData,
    };
    console.log("Current Token App Store Action ", headers);

    const res = await Axios.get(url, { headers: headers });

    console.log("After User Access Response Data: ");

    dispatch({
      type: GET_ACCESSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.data
            ? err.data
            : "Load Access Error!!"
          : "Error Not Define Access!!",
    });
  }
};
