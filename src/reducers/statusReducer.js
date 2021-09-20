import { SET_PAYMENT_STATUS, SET_PAYMENT_STATUS_ERROR } from "../actions/types";

const initialState = {
    paymentStatuses:[],
    paymentStatus:{},
    paymenStatusLoad:false,
    paymentStatusError:{}
}

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_PAYMENT_STATUS:
        return {
          ...state,
          paymentStatuses: action.payload,
          paymenStatusLoad: true,
        };
      case SET_PAYMENT_STATUS_ERROR:
        return{
          ...state,
          paymentStatusError:action.payload
        }  
      default:
        return state;
    }
  }