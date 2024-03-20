import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  data: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userData",
  initialState: initialUserState,
  reducers: {
    userRegisteredHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userRegisteredHandlerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    userRegisteredHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  userRegisteredHandlerFailure,
  userRegisteredHandlerRequest,
  userRegisteredHandlerSuccess,
} = userSlice.actions;

export default userSlice.reducer;
