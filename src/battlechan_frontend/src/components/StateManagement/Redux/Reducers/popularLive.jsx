import { createSlice } from "@reduxjs/toolkit";

const initialPopularLiveState = {
  popularLiveProject: [],
  loading: false,
  error: null,
};

const popularLiveSlice = createSlice({
  name: "popularLive",
  initialState: initialPopularLiveState,
  reducers: {
    popularLiveHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    popularLiveHandlerSuccess: (state, action) => {
      state.loading = false;
      state.popularLiveProject = action.payload;
    },
    popularLiveHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  popularLiveHandlerFailure,
  popularLiveHandlerRequest,
  popularLiveHandlerSuccess,
} = popularLiveSlice.actions;

export default popularLiveSlice.reducer;
