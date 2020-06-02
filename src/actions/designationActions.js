import {
  BASE_URL,
  REQUEST_HEADER,
  GET_DESIGNATIONS,
  GET_ERRORS,
  GET_DESIGNATION,
} from "./types";
import Axios from "axios";

export const getDesignationById = (id, history) => async (dispatch) => {
  try {
    let url = `${BASE_URL}/designations/designation/${id}`;

    const res = await Axios.get(url, REQUEST_HEADER);
    console.log("Designation get Run Reudx ", res.data);
    dispatch({
      type: GET_DESIGNATION,
      payload: res.data,
    });

    //history.push("")
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res
            : "Get Desigantion By Id Not found !!"
          : "Get Desigantion By Id Not found !!",
    });
  }
};

export const updateDesignation = (designation, history) => async (dispatch) => {
  let url = `${BASE_URL}/designations/designation`;

  try {
    Axios.put(url, designation, { headers: REQUEST_HEADER }).then((res) => {
      history.push("/designations");
    });

    dispatch({
      type: GET_DESIGNATION,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res
            : "Get Desigantion By Id Not found !!"
          : "Get Desigantion By Id Not found !!",
    });
  }
};

export const getDesignations = () => async (dispatch) => {
  let url = `${BASE_URL}/designations`;

  try {
    const res = await Axios.get(url, { headers: REQUEST_HEADER });

    dispatch({
      type: GET_DESIGNATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res
            : "Designations Error res Undifine  "
          : "Designations Load Error ",
    });
  }
};
