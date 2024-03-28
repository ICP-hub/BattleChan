
import { SET_IS_CONNECTED, SET_PRINCIPAL } from '../actionTypes';

export const setIsConnected = (isConnected: boolean) => ({
  type: SET_IS_CONNECTED,
  payload: isConnected,
});

export const setPrincipal = (principal: string) => ({
  type: SET_PRINCIPAL,
  payload: principal,
});
