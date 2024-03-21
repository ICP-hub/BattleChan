import { createSlice } from "@reduxjs/toolkit";

const initialHubState = {
  data: [],
  loading: false,
  error: null,
};

const hubSlice = createSlice({
  name: "hubeData",
  initialState: initialHubState,
  reducers: {
    hubRegisteredHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    hubRegisteredHandlerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    hubRegisteredHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  hubRegisteredHandlerFailure,
  hubRegisteredHandlerRequest,
  hubRegisteredHandlerSuccess,
} = hubSlice.actions;

export default hubSlice.reducer;
