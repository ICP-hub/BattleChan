
// for example how to make other reducers in saga 

import { createSlice } from "@reduxjs/toolkit";

const initialRoleState = {
  roles: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState: initialRoleState,
  reducers: {
    rolesHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    rolesHandlerSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    },
    rolesHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { rolesHandlerRequest, rolesHandlerSuccess, rolesHandlerFailure } =
  roleSlice.actions;

export default roleSlice.reducer;
