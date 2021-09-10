import Axios from "axios";
import {
  ADD_BANK_ACCOUNT,
  ADD_BANK_ACCOUNT_ERROR,
  BASE_URL,
  GET_BANK_ACCOUNT_OPTIONS,
  GET_BANK_ACCOUNT_OPTIONS_ERROR,
  GET_BANK_ACCOUNT_TYPES,
  GET_BANK_ERROR,
  GET_BANK_UPDATE,
  REQUEST_HEADER,
} from "./types";

export const getBankAccountTypeOptions = async (callBack) => {
  const res = await Axios.get(`${BASE_URL}/banks/types-options`, {
    headers: REQUEST_HEADER,
  });
  console.log("Bank Accounts Type Options Action Response Data, ", res);
  if (res) {
    if (res.data) {
      if (res.data.status) {
        callBack(res.data.data);
      }
    }
  }
};

export const getBankAccountTypeOptionsViaRedux = () => async (dispatch) => {
  const res = await Axios.get(`${BASE_URL}/banks/types-options`, {
    headers: REQUEST_HEADER,
  });
  console.log("Bank Accounts Type Options Action Response Data Redux, ", res);

  try {
    dispatch({
      type: GET_BANK_ACCOUNT_OPTIONS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BANK_ACCOUNT_OPTIONS_ERROR,
      payload: error,
    });
  }
};

export const getAllUpdatePendingBanks = (callBack, count = 1) => {
  Axios.get(`${BASE_URL}/banks/update/pending`, {
    headers: REQUEST_HEADER,
  })
    .then((res) => {
      if (res.data) {
        if (res.data.status) {
          callBack(res.data.data);
        }
      }
    })
    .catch((err) => {
      console.log("Error, ", err);
      console.log("Error, Count ", count);
      if (10 >= count) {
        count++;
        getAllUpdatePendingBanks(callBack, count);
      }
    });
};

export const getAddBankAccountAction = (bankAccount) => async (dispatch) => {
  bankAccount = JSON.stringify(bankAccount, null, 2);
  const res = await Axios.post(`${BASE_URL}/banks`, bankAccount, {
    headers: REQUEST_HEADER,
  });

  try {
    dispatch({
      type: ADD_BANK_ACCOUNT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_BANK_ACCOUNT_ERROR,
      payload: error,
    });
  }
};

export const getAllConfrimedBanks = (callBack) => {
  Axios.get(`${BASE_URL}/banks`)
    .then((res) => {
      if (res.data) {
        if (res.data.status) {
          console.log("Banks Response, ", res.data.data);
          callBack(res.data.data);
        }
      }
    })
    .catch((err) => {
      console.log("Error Bank Accounts, Error ", err);
    });
};

/** Pass this */
export const getAllConfrimedBankAccounts = (initProps) => {
  getAllConfrimedBanks((bankAccounts) => {
    const accountOptons =
      bankAccounts &&
      bankAccounts.map((bank, idx) => {
        if (bank) {
          return { label: bank.accountNumber, value: idx };
        }
      });
    initProps.setState({ accountOptons, bankAccounts });
  });
};

/** Bank Account Update  */

const getBankUpdateData = (resp) => {
  console.log("Bank Update response ", resp);

  return resp.status;
};
export const getBankAcccountUpdate = (bankAccount) => async (dispatch) => {
  if (bankAccount) {
    console.log("Bank Account Update ... ");
    const resp = await Axios.post(`${BASE_URL}/banks/update`, bankAccount, {
      headers: REQUEST_HEADER,
    });

    try {
      dispatch({
        type: GET_BANK_UPDATE,
        payload: getBankUpdateData(resp.data),
      });
    } catch (err) {
      dispatch({
        type: GET_BANK_ERROR,
        payload: err,
      });
    }
  }
};

export const getBankAccountTypes = () => async (dispatch) => {
  const resp = Axios.get(`${BASE_URL}/banks/types`);

  try {
    dispatch({
      type: GET_BANK_ACCOUNT_TYPES,
      payload: (await resp).data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BANK_ERROR,
      payload: { msg: "Bank Account Types not found", status: false },
    });
  }
};
