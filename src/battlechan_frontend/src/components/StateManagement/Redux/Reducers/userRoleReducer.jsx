import { createSlice } from "@reduxjs/toolkit";

const initialUserRole = {
  specificRole: null,
  hasSelectedRole :false,
  loading: false,
  error: null,
};

const userRoleSlice = createSlice({
  name: "currentRole",
  initialState: initialUserRole,
  reducers: {
    userRoleHandler: (state) => {
      state.loading = true;
      state.error = null;
    },
    userRoleSuccessHandler: (state, action) => {
      // console.log('specificRole in reducer =>',action.payload)
      state.loading = false;
      state.specificRole = action.payload;
      state.hasSelectedRole = true
    },
    userRoleFailureHandler: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changeHasSelectedRoleHandler :(state,action)=>{
      state.hasSelectedRole = action.payload;
    }

  },
});

export const {
  userRoleHandler,
  userRoleFailureHandler,
  userRoleSuccessHandler,
  changeHasSelectedRoleHandler
} = userRoleSlice.actions;

export default userRoleSlice.reducer;
