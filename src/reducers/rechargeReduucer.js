import {
  SET_APV_RECHAARGE,
  SET_APV_RECHAARGE_ERROR,
  SET_PENDINGG_RECHARGES,
  SET_RECHARGES_ERRROR,
  SET_RECHARGE_PENDINGG_APPROVE,
} from "../actions/types";

const initialState = {
  pendingRecharges: [],
  recharge: {},
  rechargeApproveState: false,
  rejectStatus: false,
  error: {},
  errorStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PENDINGG_RECHARGES:
      return {
        ...state,
        pendingRecharges: action.payload,
      };

    case SET_RECHARGES_ERRROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_APV_RECHAARGE:
      return {
        ...state,
        recharge: action.payload.status ? action.payload.recharge : {},
      };
    case SET_APV_RECHAARGE_ERROR:
      return {
        ...state,
        error: action.payload.error,
        status: action.payload.status,
      };
    case SET_RECHARGE_PENDINGG_APPROVE:
      return{
        ...state,
        rechargeApproveState:action.payload,
      }

    default:
      return state;
  }
}
