import { createSlice } from "@reduxjs/toolkit";

const initialLatestListedState = {
  latestListedProject: [],
  loading: false,
  error: null,
};

const latestListedSlice = createSlice({
  name: "latestList",
  initialState: initialLatestListedState,
  reducers: {
    latestListedHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    latestListedHandlerSuccess: (state, action) => {
      state.loading = false;
      state.latestListedProject = action.payload;
    },
    latestListedHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  latestListedHandlerFailure,
  latestListedHandlerRequest,
  latestListedHandlerSuccess,
} = latestListedSlice.actions;

export default latestListedSlice.reducer;
