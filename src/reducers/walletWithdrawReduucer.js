import { SET_PENDING_WALLET_ERROR, SET_PENDING_WALLET_WITHDRAW, SET_WALLET_WITHDARW } from "../actions/types";

const initialState = {
  walletWithDrawals: [],
  error: {},
  errorStatus: false,
  walletWithdraw:{},
  walleSingletStatus:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PENDING_WALLET_WITHDRAW:
      return {
        ...state,
        walletWithDrawals: action.payload,
      };

    case SET_PENDING_WALLET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_WALLET_WITHDARW:
      return {
        ...state,
        walletWithdraw:action.payload,
        walleSingletStatus:true
      }  
    
    default:
      return state;
  }
}
