// src/redux/reducers/authReducer.ts

import { SET_IS_CONNECTED, SET_PRINCIPAL } from '../actionTypes';

interface AuthState {
  isConnected: boolean;
  principal: string | null;
}

const initialState: AuthState = {
  isConnected: false,
  principal: null,
};

export const authReducer = (state = initialState, action: { type: string; payload: any }): AuthState => {
  switch (action.type) {
    case SET_IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload,
      };
    case SET_PRINCIPAL:
      return {
        ...state,
        principal: action.payload,
      };
    default:
      return state;
  }
};
