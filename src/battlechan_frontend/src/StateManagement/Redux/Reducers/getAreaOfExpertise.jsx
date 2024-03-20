import { createSlice } from "@reduxjs/toolkit";

const initialAreaOfExpertiseState = {
  expertise: [],
  loading: false,
  error: null,
};

const areaOfExpertiseSlice = createSlice({
  name: "expert",
  initialState: initialAreaOfExpertiseState,
  reducers: {
    areaOfExpertiseHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    areaOfExpertiseHandlerSuccess: (state, action) => {
      state.loading = false;
      state.expertise = action.payload;
    },
    areaOfExpertiseHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { areaOfExpertiseHandlerFailure, areaOfExpertiseHandlerRequest, areaOfExpertiseHandlerSuccess } =
  areaOfExpertiseSlice.actions;

export default areaOfExpertiseSlice.reducer;
