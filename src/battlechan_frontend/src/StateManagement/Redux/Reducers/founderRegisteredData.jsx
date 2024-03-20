import { createSlice } from "@reduxjs/toolkit";

const initialFounderState = {
  data: [],
  loading: false,
  error: null,
};

const founderSlice = createSlice({
  name: "foundereData",
  initialState: initialFounderState,
  reducers: {
    founderRegisteredHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    founderRegisteredHandlerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    founderRegisteredHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  founderRegisteredHandlerFailure,
  founderRegisteredHandlerRequest,
  founderRegisteredHandlerSuccess,
} = founderSlice.actions;

export default founderSlice.reducer;
