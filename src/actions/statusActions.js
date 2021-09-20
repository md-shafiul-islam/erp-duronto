import Axios from "axios";
import { BASE_URL, SET_PAYMENT_STATUS, SET_PAYMENT_STATUS_ERROR } from "./types";

const getRespData = (response) => {
    if (response !== undefined && response !== null) {
      if (response.data !== undefined && response.data !== null) {
        return response.data.data;
      }
    }
    return null;
  };

export const getPaymentStatus = () =>async dispatch=>{
    const resp = await Axios.get(`${BASE_URL}/paymet-status/options/true`);

    try {
        
        dispatch({
            payload:getRespData(resp),
            type:SET_PAYMENT_STATUS,
        })

    } catch (err) {
        dispatch({
            type:SET_PAYMENT_STATUS_ERROR,
            payload:{msg:"PaymetStatus Load Error", status:true}
        })
    }
}