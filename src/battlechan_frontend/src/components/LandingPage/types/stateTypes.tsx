

export interface AuthState {
  isAuthenticated: boolean; 
  isConnected: boolean;    
  principal: string | null; 
}

export interface RootState {
  auth: AuthState; 
}
