import { createSlice } from "@reduxjs/toolkit";

const initialLatestLiveState = {
  latestLiveProject: [],
  loading: false,
  error: null,
};

const latestLiveSlice = createSlice({
  name: "latestLive",
  initialState: initialLatestLiveState,
  reducers: {
    latestLiveHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    latestLiveHandlerSuccess: (state, action) => {
      state.loading = false;
      state.latestLiveProject = action.payload;
    },
    latestLiveHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  latestLiveHandlerFailure,
  latestLiveHandlerRequest,
  latestLiveHandlerSuccess,
} = latestLiveSlice.actions;

export default latestLiveSlice.reducer;
