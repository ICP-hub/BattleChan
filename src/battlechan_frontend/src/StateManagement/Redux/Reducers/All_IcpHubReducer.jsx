import { createSlice } from "@reduxjs/toolkit";

const initialAllIcpState = {
  allHubs: [],
  loading: false,
  error: null,
};

const allHubSlice = createSlice({
  name: "hubs",
  initialState: initialAllIcpState,
  reducers: {
    allHubHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    allHubHandlerSuccess: (state, action) => {
      state.loading = false;
      state.allHubs = action.payload;
    },
    allHubHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  allHubHandlerRequest,
  allHubHandlerSuccess,
  allHubHandlerFailure,
} = allHubSlice.actions;

export default allHubSlice.reducer;
