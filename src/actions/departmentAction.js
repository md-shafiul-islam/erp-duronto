import Axios from "axios";
import { BASE_URL, GET_DEPARTMENTS, GET_DEPARTMENTS_ERROR, GET_DEPARTMENT_ERROR, GET_DEPARTMENT_OPTIONS, GET_DEPARTMENT_OPTIONS_ERROR, REQUEST_HEADER } from "./types";

export const getDepartmetsAction =()=> async (dispatch) => {
    const resp = await Axios.get(`${BASE_URL}/departments`, { headers: REQUEST_HEADER });
    console.log("Departemt ", resp);
    try {
        
        dispatch({
            type:GET_DEPARTMENTS,
            payload:resp.data,
        })
    } catch (err) {
        console.log("Error Loding Department ")
        dispatch({
            type:GET_DEPARTMENTS_ERROR,
            payload:err,
        })
    }
  };

  export const getDepartmetOptionsAction =()=> async (dispatch) => {
    const resp = await Axios.get(`${BASE_URL}/departments/options`, { headers: REQUEST_HEADER });
    console.log("Departemt ", resp);
    try {
        
        dispatch({
            type:GET_DEPARTMENT_OPTIONS,
            payload:resp.data,
        })
    } catch (err) {
        console.log("Error Loding Department ")
        dispatch({
            type:GET_DEPARTMENT_OPTIONS_ERROR,
            payload:err,
        })
    }
  };