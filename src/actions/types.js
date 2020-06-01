export const GET_ERRORS = "GET_ERRORS";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIY = "GET_COUNTRIY";
export const DELET_COUNTRIY = "DELET_COUNTRIY";

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
  "Content-Type": "application/x-www-form-urlencoded",
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

export const BASE_URL = "http://localhost:8085/api";
