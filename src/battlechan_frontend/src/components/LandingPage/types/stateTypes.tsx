// src/types/stateTypes.ts

export interface AuthState {
  isAuthenticated: boolean; //  isAuthenticated state
  isConnected: boolean;    // New isConnected state to track if connected
  principal: string | null; // New principal state, which can be a string or null
}

export interface RootState {
  auth: AuthState; // This assumes your auth reducer is stored under 'auth' key in the Redux store
}
