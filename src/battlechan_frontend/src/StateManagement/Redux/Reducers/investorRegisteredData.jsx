import { createSlice } from "@reduxjs/toolkit";

const initialInvestorState = {
  data: [],
  loading: false,
  error: null,
};

const investorSlice = createSlice({
  name: "investoreData",
  initialState: initialInvestorState,
  reducers: {
    investorRegisteredHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    investorRegisteredHandlerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    investorRegisteredHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  investorRegisteredHandlerFailure,
  investorRegisteredHandlerRequest,
  investorRegisteredHandlerSuccess,
} = investorSlice.actions;

export default investorSlice.reducer;
