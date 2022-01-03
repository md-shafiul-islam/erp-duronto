import axios from "axios";
import { helperIsEmpty } from "../utils/helper/esFunc";
import {
  APPROVE_RECHARGE,
  BASE_URL,
  REQUEST_HEADER,
  SET_APPROVED_RECHARGES,
  SET_PENDING_RECHARGES,
  SET_RECHARGE_USING_ID,
  SET_REJECT_RECHARGE,
  SET_REJECT_RECHARGES,
} from "./types";

const getRechargeData = (resp) => {
  if (!helperIsEmpty(resp)) {
    if (resp.status) {
      return { errorStatus: false, message: resp.message, recharge: resp.data };
    }
  }
  return {
    errorStatus: false,
    message: "Recharge Not found using id",
    recharge: null,
  };
};

export const getRechargePendings = () => async (dispatch) => {
  const actionUrl = `${BASE_URL}/recharges/pending`;

  try {
    const resp = await axios.get(actionUrl, { headers: REQUEST_HEADER });
    console.log("Pending Recharge Action Resonse, ", resp);

    dispatch({
      type: SET_PENDING_RECHARGES,
      payload: resp.data.data ? { errStatus: false, ...resp.data } : [],
    });
  } catch (error) {
    dispatch({
      type: SET_PENDING_RECHARGES,
      payload: { status: false, message: error.message, errStatus: true },
    });
    console.log("Pending Recharge Action Error, ", error);
  }
};

export const getRechargeUsingId = (id) => async (dispatch) => {
  const url = `${BASE_URL}/recharges/${id}`;
  console.log("Current URL : ", url);
  try {
    const resp = await axios.get(url, { headers: REQUEST_HEADER });
    console.log("Recharge Response, ", resp);
    dispatch({
      type: SET_RECHARGE_USING_ID,
      payload: getRechargeData(resp.data),
    });
  } catch (error) {
    console.log("Recharge Get Using ID, ", error, " ID ", id);
    dispatch({
      type: SET_RECHARGE_USING_ID,
      payload: { errorStatus: true, message: error.message, recharge: null },
    });
  }
};

const getRechargeActionResponse = (response) => {
  if (!helperIsEmpty(response)) {
    return { errorStatus: false, ...response };
  }
  return {
    errorStatus: false,
    status: false,
    data: null,
    message: "Recharge Approve Failed",
  };
};

export const getRechargeApproveAction =
  (approveRecharge) => async (dispatch) => {
    if (!helperIsEmpty(approveRecharge)) {
      const url = `${BASE_URL}/recharges/approve`;

      try {
        const response = await axios.put(url, approveRecharge, {
          headers: REQUEST_HEADER,
        });
        dispatch({
          type: APPROVE_RECHARGE,
          payload: getRechargeActionResponse(response.data),
        });
      } catch (err) {
        console.log("Error Recharge Approve failed, ", err);
        dispatch({
          type: APPROVE_RECHARGE,
          payload: {
            errorStatus: true,
            status: false,
            data: null,
            message: err.message,
          },
        });
      }
    }
  };

export const getApprovedRecharges = () => async (dispatch) => {
  try {
    const response = await axios(`${BASE_URL}/recharges`, {
      headers: REQUEST_HEADER,
    });

    dispatch({
      type: SET_APPROVED_RECHARGES,
      payload: { errStatus: false, ...response.data },
    });
  } catch (error) {
    dispatch({
      type: SET_APPROVED_RECHARGES,
      payload: { errStatus: true, status: false, message: error.message },
    });
  }
};

//Reject Action
export const getRejectRecharge = (recharge) => async (dispatch) => {
  console.log("Reject Recharge Action ...");

  try {
    const response = await axios.put(`${BASE_URL}/recharges/reject`, recharge, {
      headers: REQUEST_HEADER,
    });
    console.log("Reject Recharge Action Response ", response);
    dispatch({
      type: SET_REJECT_RECHARGE,
      payload: { errStatus: false, ...response.data },
    });
  } catch (error) {
    dispatch({
      type: SET_REJECT_RECHARGE,
      payload: { errStatus: true, status: false, message: error.message },
    });
  }
};


export const getRejectedRecharges = () => async (dispatch) => {
  try {
    const response = await axios(`${BASE_URL}/recharges/reject`, {
      headers: REQUEST_HEADER,
    });

    dispatch({
      type: SET_REJECT_RECHARGES,
      payload: { errStatus: false, ...response.data },
    });
  } catch (error) {
    dispatch({
      type: SET_REJECT_RECHARGES,
      payload: { errStatus: true, status: false, message: error.message },
    });
  }
};