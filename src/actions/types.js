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

export const EXT_BASE_URL = process.env.REACT_APP_API_URL; //`http://localhost:6060` //`http://dto.durontotour.com`; // `http://localhost:6060`;
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

export const GET_BANK_OPTIONS = "GET_BANK_OPTIONS";
export const SET_CONFRIMED_BANK_ACCOUNT = "SET_CONFRIMED_BANK_ACCOUNT";

/**ES CONST  */
export const GET_DEPARTMENT = "GET_DEPARTMENT";
export const GET_DEPARTMENT_ERROR = "GET_DEPARTMENT_ERROR";
export const GET_DEPARTMENTS = "GET_DEPARTMENTS";
export const GET_DEPARTMENTS_ERROR = "GET_DEPARTMENTS_ERROR";
export const GET_DEPARTMENT_OPTIONS = "GET_DEPARTMENT_OPTIONS";
export const GET_DEPARTMENT_OPTIONS_ERROR = "GET_DEPARTMENT_OPTIONS_ERROR";

export const GET_DESIGNATION_OPTIONS = "GET_DESIGNATION_OPTIONS";
export const GET_DESIGNATION_OPTIONS_ERROR = "GET_DESIGNATION_OPTIONS_ERROR";

export const GET_GENDER_OPTIONS = "GET_GENDER_OPTIONS";
export const GET_GENDER_OPTIONS_ERROR = "GET_GENDER_OPTIONS_ERROR";

export const GET_MARITAL_STATUS_OPTIONS = "GET_MARITAL_STATUS_OPTIONS";
export const GET_MARITAL_STATUS_OPTIONS_ERROR = "GET_MARITAL_STATUS_OPTIONS_ERROR";

export const GET_ROLE_OPTIONS = "GET_ROLE_OPTIONS";
export const GET_ROLE_OPTIONS_ERROR = "GET_ROLE_OPTIONS_ERROR";

export const GET_COUNTRY_OPTIONS = "GET_COUNTRY_OPTIONS";
export const GET_COUNTRY_OPTIONS_ERROR = "GET_COUNTRY_OPTIONS_ERROR";


