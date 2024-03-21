import { createSlice } from "@reduxjs/toolkit";

const initialPopularListedState = {
  popularListedProject: [],
  loading: false,
  error: null,
};

const popularListedSlice = createSlice({
  name: "pupularList",
  initialState: initialPopularListedState,
  reducers: {
    popularListedHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    popularListedHandlerSuccess: (state, action) => {
      state.loading = false;
      state.popularListedProject = action.payload;
    },
    popularListedHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  popularListedHandlerFailure,
  popularListedHandlerRequest,
  popularListedHandlerSuccess,
} = popularListedSlice.actions;

export default popularListedSlice.reducer;
