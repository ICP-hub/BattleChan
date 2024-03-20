import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  identity: null,
  principal: null,
  loading: false,
  error: null,
  navi: null,
};

const internetIdentitySlice = createSlice({
  name: "internet",
  initialState,
  reducers: {
    checkLoginOnStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      // console.log("loginSuccess run =>", action);
      const { isAuthenticated, identity, principal, navi } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.identity = identity;
      state.principal = principal;
      state.loading = false;
      state.error = null;
      state.navi = navi;
    },
    loginFailure: (state, action) => {
      // console.log("loginFailure run =>", action);
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      // console.log("logoutStart run ");
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      // console.log("logoutSuccess run ");

      state.isAuthenticated = false;
      state.identity = null;
      state.principal = null;
      state.loading = false;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      // console.log("logoutFailure run =>", action);
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  // setAuthClient,
  checkLoginOnStart,
  loginStart,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} = internetIdentitySlice.actions;

export default internetIdentitySlice.reducer;
