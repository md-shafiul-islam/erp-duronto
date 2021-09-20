export const GET_ERRORS = "GET_ERRORS";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIY = "GET_COUNTRIY";
export const DELET_COUNTRIY = "DELET_COUNTRIY";
export const SET_COUNTRIY_OPTION = "SET_COUNTRIY_OPTION";
export const SET_COUNTRIY_OPTION_ERROR = "SET_COUNTRIY_OPTION_ERROR";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORY = "GET_CATEGORY";
export const DELET_CATEGORY = "DELET_CATEGORY";

export const REQUEST_HEADER = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
  Authorization:
    localStorage.jwtToken !== undefined ? localStorage.jwtToken : "",
};

export const REQUEST_HEADER_GET = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
  Authorization:
    localStorage.jwtToken !== undefined ? localStorage.jwtToken : "",
};

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const GET_ACCESSES = "GET_ACCESSES";
export const GET_ACCESS = "GET_ACCESS";

//Type for backlog Actions
export const GET_BACKLOG = "GET_BACKLOG";
export const SET_TOKEN = "SET_TOKEN";

console.log(process.env.REACT_APP_API_URL);

export const EXT_BASE_URL = `http://localhost:6060`; //`http://dto.durontotour.com`; // `http://localhost:6060`;
export const BASE_URL = `${EXT_BASE_URL}/api`;

export const GET_PACK_CATEGORIES = "GET_PACK_CATEGORIES";
export const GET_PACK_CATEGORY = "GET_PACK_CATEGORY";
export const PACK_CAT_DELETE = "GET_PACK_DELETE";

export const GET_DESIGNATIONS = "GET_DESIGNATIONS";
export const GET_DESIGNATION = "GET_DESIGNATION";

export const ADD_BANK_ACCOUNT = "ADD_BANK_ACCOUNT";
export const ADD_BANK_ACCOUNT_ERROR = "ADD_BANK_ACCOUNT_ERROR";
export const GET_BANK_ACCOUNT_TYPES = "GET_BANK_ACCOUNT_TYPES";
export const GET_BANK_ACCOUNT_OPTIONS = "GET_BANK_ACCOUNT_OPTIONS";
export const GET_BANK_ACCOUNT_OPTIONS_ERROR = "GET_BANK_ACCOUNT_OPTIONS_ERROR";
export const GET_BANK_UPDATE = "GET_BANK_UPDATE";
export const GET_BANK_ERROR = "GET_BANK_ERROR";
export const GET_BANK_ACCOUNT_UPDATE_APPRROVE =
  "GET_BANK_ACCOUNT_UPDATE_APPRROVE";
export const SET_BANK_CHANGE_STATUS = "SET_BANK_CHANGE_STATUS";
export const BANK_LOGO_UPLOAD = "BANK_LOGO_UPLOAD";
export const UPLOAD_ERROR = "UPLOAD_ERROR";

/* Recharge Action Tyep */
export const SET_PENDINGG_RECHARGES = "SET_PENDINGG_RECHARGES";
export const SET_RECHARGES_ERRROR = "SET_RECHARGES_ERRROR";
export const SET_RECHARGE_PENDINGG_APPROVE = "SET_RECHARGE_PENDINGG_APPROVE";

export const SET_APV_RECHAARGE = "SET_APV_RECHAARGE";
export const SET_APV_RECHAARGE_ERROR = "SET_APV_RECHAARGE_ERROR";
export const SET_REJECT_RECHARGES = "SET_REJECT_RECHARGES";
export const SET_REJECT_RECHARGES_STATUS = "SET_REJECT_RECHARGES_STATUS";

/*Wallet With darw */
export const SET_PENDING_WALLET_WITHDRAW = "SET_PENDING_WALLET_WITHDRAW";
export const SET_PENDING_WALLET_ERROR = "SET_PENDING_WALLET_ERROR";

export const SET_WALLET_WITHDARW = "SET_WALLET_WITHDARW";
export const SET_SINGLE_WALLET_ERROR = "SET_SINGLE_WALLET_ERROR";

export const SET_PAYMENT_STATUS = "SET_PAYMENT_STATUS";
export const SET_PAYMENT_STATUS_ERROR = "SET_PAYMENT_STATUS_ERROR";




