import Axios from "axios";

import {
  BASE_URL,
  REQUEST_HEADER,
  SET_CURRENT_USER,
  GET_ERRORS,
} from "./types";
import setJWTToken from "../SecurityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const loginAction = (LoginRequest) => async (dispatch) => {
  try {
    // post => Login Request
    const res = await Axios.post(`${BASE_URL}/users/login`, LoginRequest, {
      headers: REQUEST_HEADER,
    });
    // extract token from res.data
    const { token } = res.data;

    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);

    // set our token in header ***
    setJWTToken(token);

    // decode token on React

    const decoded = jwt_decode(token);

    // dispatch to our securityReducer

    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });

    console.log("After dispatch Set User");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.response !== undefined
            ? err.response.data !== undefined
              ? err.response.data
              : "Error Data not Found"
            : "Error Response Not Define"
          : "Error Not Found Or Undefine",
    });
  }
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);

  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
