import {
  APPROVE_RECHARGE,
  SET_APPROVED_RECHARGES,
  SET_PENDING_RECHARGES,
  SET_RECHARGE_USING_ID,
  SET_REJECT_RECHARGE,
  SET_REJECT_RECHARGES,
} from "../actions/types";
import { helperIsEmpty } from "../utils/helper/esFunc";

const initialValues = {
  pendingRecharges: [],
  rechargesError: {},
  recharge: undefined,
  rechargeLoadStatus: false,
  rechargeApprove: undefined,
  approveRecharges: undefined,
  rechargeReject:undefined,
  rejectRecharges:undefined,
};

const getPendingRecharges = (payload) => {
  console.log("Recharge Action Reducer :) ", payload);
  if (!helperIsEmpty(payload)) {
    if (payload.status && !payload.errStatus) {
      return payload.data;
    }
  }
  return [];
};

const getRecharge = (state, payload) => {
  console.log("Current Recharge Item, ", payload);
  if (!helperIsEmpty(payload.recharge) && !payload.errorStatus) {
    return {
      ...state,
      recharge: payload.recharge,
      rechargeLoadStatus: false,
    };
  }
  return { ...state, rechargeLoadStatus: false };
};

export default function (state = initialValues, action) {
  switch (action.type) {
    case SET_PENDING_RECHARGES:
      return {
        ...state,
        pendingRecharges: getPendingRecharges(action.payload),
      };

    case SET_RECHARGE_USING_ID:
      return getRecharge(state, action.payload);

    case APPROVE_RECHARGE:
      return {
        ...state,
        rechargeApprove: action.payload,
      };

    case SET_APPROVED_RECHARGES:
      return {
        ...state,
        approveRecharges: action.payload,
      };

    case SET_REJECT_RECHARGE:
      return {
        ...state,
        rechargeReject: action.payload,
      };
    case SET_REJECT_RECHARGES:
      return {
        ...state,
        rejectRecharges:action.payload
      }  
    default:
      return state;
  }
}
