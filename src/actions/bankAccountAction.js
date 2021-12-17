import axios from "axios";
import { BASE_URL, REQUEST_HEADER, SET_CONFRIMED_BANK_ACCOUNT } from "./types";

export const getConfrimedBankAccounts = () => async (dispatch) => {
  const url = `${BASE_URL}/bankaccounts`;

  try {
    const resp = axios.get(url, { headers: REQUEST_HEADER });

    dispatch({
      type: SET_CONFRIMED_BANK_ACCOUNT,
      payload: resp.data ? { errStatus: false, ...resp.data } : [],
    });
  } catch (error) {
    dispatch({
      type: SET_CONFRIMED_BANK_ACCOUNT,
      payload: { status: false, message: error.message, errStatus: true },
    });
  }
};
