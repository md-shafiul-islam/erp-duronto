import Axios from "axios";
import {
  BASE_URL,
  REQUEST_HEADER,
  SET_PAYMENT_STATUS,
  SET_PENDING_WALLET_ERROR,
  SET_PENDING_WALLET_WITHDRAW,
  SET_SINGLE_WALLET_ERROR,
  SET_WALLET_WITHDARW,
} from "./types";

const getRespData = (response) => {
  if (response !== undefined && response !== null) {
    if (response.data !== undefined && response.data !== null) {
      return response.data.data;
    }
  }
  return null;
};

export const getApprovePendingWalletWithdraws = () => async (dispatch) => {
  const resp = await Axios.get(`${BASE_URL}/wallet-withdraws?type=0`);

  try {
    dispatch({
      type: SET_PENDING_WALLET_WITHDRAW,
      payload: getRespData(resp),
    });
  } catch (err) {
    dispatch({
      type: SET_PENDING_WALLET_ERROR,
      payload: err.message,
    });
  }
};

export const getWalletWithDarwById = (id) => async (dispatch) => {
  const resp = await Axios.get(`${BASE_URL}/wallet-withdraws/${id}`);

  console.log("Get Wallet Withdraw  By ID, ", resp);

  try {
    dispatch({
        type: SET_WALLET_WITHDARW,
        payload: getRespData(resp),
      });
  } catch (error) {
    dispatch({
        type: SET_SINGLE_WALLET_ERROR,
        payload: {
          status: true,
          msg: "Single Wallet Withdraw not found by given ID Or Network Error try again later...",
        },
      });   
  }
};


