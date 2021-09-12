import Axios from "axios";
import {
  BASE_URL,
  REQUEST_HEADER,
  SET_APV_RECHAARGE,
  SET_APV_RECHAARGE_ERROR,
  SET_PENDINGG_RECHARGES,
  SET_RECHARGES_ERRROR,
  SET_RECHARGE_PENDINGG_APPROVE,
} from "./types";

export const getApprovePendingRecharges = () => async (dispatch) => {
  const resp = await Axios.get(`${BASE_URL}/recharges/pending`);

  console.log("Pending Recharges, ", resp);

  try {
    dispatch({
      type: SET_PENDINGG_RECHARGES,
      payload: resp.data.data,
    });
  } catch (error) {
    dispatch({
      type: SET_RECHARGES_ERRROR,
      payload: error,
    });
  }
};

export const getApproveAction = (recharge) => async (dispatch) => {
  console.log("Recharge Account Approve Action Values ", recharge);
  const resp = await Axios.put(`${BASE_URL}/recharges/approve`, recharge, {
    headers: REQUEST_HEADER,
  });

  try {
    dispatch({
      type: SET_RECHARGE_PENDINGG_APPROVE,
      payload: resp.data.status,
    });
  } catch (err) {
    dispatch({
      type: SET_RECHARGES_ERRROR,
      payload: {
        status: resp.data.status,
        msg: "Recharge approve failed ",
        error: err,
      },
    });
  }
};

export const getRecchargeDetails = (id) => async (dispatch) => {
  const resp = await Axios.get(`${BASE_URL}/recharges/${id}`);

  console.log("Selected Recharge ", resp);

  try {
    dispatch({
      type: SET_APV_RECHAARGE,
      payload: {
        recharge: resp.data.data,
        status: resp.data.status,
        msg: resp.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: SET_APV_RECHAARGE_ERROR,
      payload: { error, status: resp.data.status },
    });
  }
};
