import Axios  from "axios";
import { BASE_URL, GET_GENDER_OPTIONS, GET_GENDER_OPTIONS_ERROR, REQUEST_HEADER } from "./types";

export const getGenderOptionsAction = ()=> async (dispatch) => {

    const resp = await Axios.get(`${BASE_URL}/genders/option`, { headers: REQUEST_HEADER });
    
    try {
        dispatch({
            type:GET_GENDER_OPTIONS,
            payload:resp.data,
        })
    } catch (err) {
        dispatch({
            type:GET_GENDER_OPTIONS_ERROR,
            payload:err,
        })
    }
  };